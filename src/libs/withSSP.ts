import Axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

type RequestFunction<
  P extends Record<string, unknown> = Record<string, never>,
  Q extends Record<string, string> = Record<string, never>
> = (
  context: GetServerSidePropsContext<Q>,
  axiosInstance: AxiosInstance
) => Promise<{ props: P }>

export interface SuccessProps extends Record<string, unknown> {
  success: true
}

export interface ErrorProps {
  success: false
  error: {
    statusCode: number
    title: string
  }
}

export type PageProps<
  P extends Record<string, unknown> = Record<string, never>
> = (SuccessProps & P) | ErrorProps

export function withSSP<
  P extends Record<string, unknown> = Record<string, never>,
  Q extends Record<string, string> = Record<string, never>
>(onRequest: RequestFunction<P, Q>): GetServerSideProps<PageProps<P>, Q> {
  return async (context) => {
    const axiosInstance = Axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_CANNON_URL}/api`,
      headers: context.req.headers,
    })
    try {
      const { props } = await onRequest(context, axiosInstance)
      return { props: { success: true, ...props } }
    } catch (unknownError: unknown) {
      if (typeof unknownError === 'object' && 'isAxiosError' in unknownError) {
        const axiosError = unknownError as AxiosError
        return {
          props: {
            success: false,
            error: {
              statusCode: axiosError.response.status,
              title: axiosError.response.statusText,
            },
          },
        }
      }
      // TODO: handle other errors
      throw Error('Panic!')
    }
  }
}
