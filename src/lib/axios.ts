import Axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useRouter } from "next/router";

const useAxios = (token?: string) => {
  const router = useRouter();

  function createAxiosConfig(): AxiosRequestConfig {
    const baseURL = `/api`;
    if (token) {
      return { baseURL, headers: { authorization: `Bearer ${token}` } };
    }
    return { baseURL };
  }

  const axiosInstance = Axios.create(createAxiosConfig());

  function errorHandler<T = any>(err: AxiosError<T>) {
    switch (err.response.status) {
      case 405:
      case 404:
      case 403:
      case 400:
        console.log(err.response.data);
        break;
      case 401:
        router.push("/401");
        break;
      default:
        throw new Error(JSON.stringify(err));
    }
  }

  return {
    axios: axiosInstance,
    errorHandler,
  };
};

export { useAxios };
