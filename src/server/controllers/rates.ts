import Axios, { AxiosRequestConfig } from 'axios'
import { NextApiHandler } from 'next'

import { ExchangeResponse } from '../../types'
import { Currencies } from '../../types'

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_RATES_API,
})

const getRates: NextApiHandler = async (req, res) => {
  const options: AxiosRequestConfig = {
    params: {
      from: Currencies.CAD,
      to: Currencies.BRL,
    },
  }

  try {
    const response = await axiosInstance.get<ExchangeResponse>(
      '/latest',
      options
    )
    console.log(response)

    return res.json(response.data.rates)
  } catch (error) {
    return res.json(error)
  }
}

export { getRates }
