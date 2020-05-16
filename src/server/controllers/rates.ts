import Axios, { AxiosRequestConfig } from "axios";

import { ExchangeResponse, Handler } from "../../types/interfaces";
import { Currencies } from "../../types/enums";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_RATES_API,
});

const getRates: Handler = async (req, res) => {
  const options: AxiosRequestConfig = {
    params: {
      symbols: Currencies.BRL,
      base: Currencies.CAD,
    },
  };

  try {
    const response = await axiosInstance.get<ExchangeResponse>("", options);
    return res.json(response.data.rates);
  } catch (error) {
    return res.json(error);
  }
};

export { getRates };
