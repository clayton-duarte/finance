import Axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { useRouter } from 'next/router'

function createAxiosConfig(): AxiosRequestConfig {
  const baseURL = `${process.env.NEXT_PUBLIC_CANNON_URL}/api`
  return { baseURL }
}

const axiosInstance = Axios.create(createAxiosConfig())

const useAxios = () => {
  const router = useRouter()

  function errorHandler<T = any>(err: AxiosError<T>) {
    switch (err.response.status) {
      case 401:
        // return signIn("google");
        return router.push('/profile')
      case 400:
      case 403:
      case 404:
      case 405:
        // TODO > Real error handling (use _error.tsx)
        return console.log(err.response.data)
      default:
        throw new Error(JSON.stringify(err))
    }
  }

  return {
    axios: axiosInstance,
    errorHandler,
  }
}

export { axiosInstance, useAxios }
