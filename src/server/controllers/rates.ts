import Axios, { AxiosRequestConfig } from "axios";
import { NextApiHandler } from "next";

import { ExchangeResponse } from "../../types";
import { Currencies } from "../../types";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_RATES_API,
});

const getRates: NextApiHandler = async (req, res) => {
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
