import Axios, { AxiosRequestConfig } from "axios";
import { NextApiHandler } from "next";

import { ExchangeResponse } from "../../types";
import { Currencies } from "../../types";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_RATES_API,
});

const options: AxiosRequestConfig = {
  params: {
    from: Currencies.CAD,
    to: Currencies.BRL,
  },
} as const;

const getRates: NextApiHandler = async (req, res) => {
  try {
    const response = await axiosInstance.get<ExchangeResponse>(
      "/latest",
      options
    );

    return res.json(response.data.rates);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { getRates };
