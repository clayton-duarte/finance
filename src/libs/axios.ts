import Axios, { AxiosRequestConfig, AxiosError } from "axios";
import { signIn } from "next-auth/client";

const useAxios = (token?: string) => {
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
      case 401:
        return signIn("google");
      case 400:
      case 403:
      case 404:
      case 405:
        // TODO > Real error handling (use _error.tsx)
        return console.log(err.response.data);
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
