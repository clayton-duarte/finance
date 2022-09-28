import Axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type RequestFunction<
  P extends Record<string, unknown> = Record<string, never>,
  Q extends Record<string, string> = Record<string, never>
> = (
  context: GetServerSidePropsContext<Q>,
  axiosInstance: AxiosInstance
) => Promise<{ props: P }>;

export interface SuccessProps extends Record<string, unknown> {
  success: true;
}

export interface ErrorProps {
  success: false;
  error: {
    statusCode: number;
    title: string;
  };
}

export type PageProps<
  P extends Record<string, unknown> = Record<string, never>
> = (SuccessProps & P) | ErrorProps;

export function withSSP<
  P extends Record<string, unknown> = Record<string, never>,
  Q extends Record<string, string> = Record<string, never>
>(onRequest: RequestFunction<P, Q>): GetServerSideProps<PageProps<P>, Q> {
  return async (context) => {
    const axiosInstance = Axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_CANNON_URL}/api`,
      headers: context.req.headers as AxiosRequestHeaders,
    });

    try {
      const { props } = await onRequest(context, axiosInstance);
      return { props: { success: true, ...props } };
    } catch (unknownError: unknown) {
      if (typeof unknownError === "object" && "isAxiosError" in unknownError) {
        const axiosError = unknownError as AxiosError;

        if (axiosError.response.status === 401) {
          return {
            redirect: {
              permanent: false,
              destination: "/profile",
            },
          };
        }

        const {
          status: statusCode,
          data: errorMessage,
          statusText,
        } = axiosError.response;

        return {
          props: {
            success: false,
            error: {
              title:
                errorMessage != null
                  ? JSON.stringify(errorMessage)
                  : statusText,
              statusCode,
            },
          },
        };
      }

      // TODO: handle other errors
      throw Error(`Panic! ${unknownError}`);
    }
  };
}
