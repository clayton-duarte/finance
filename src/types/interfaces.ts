import { NextApiRequest, NextApiResponse } from "next";
import { MagicUserMetadata } from "magic-sdk";
import { Session } from "next-iron-session";

import { Currencies } from "./enums";

export type User = MagicUserMetadata;
export interface Account {
  _id?: string;
  currency: Currencies;
  amount: number;
  name: string;
}
export interface ExchangeResponse {
  base: Currencies.CAD;
  date: string;
  rates: {
    [Currencies.BRL]: number;
  };
}

export type RatesResponse = ExchangeResponse["rates"];

interface NextApiRequestWithSession extends NextApiRequest {
  session: Session;
}

export type Handler<T = any> = (
  req: NextApiRequestWithSession,
  res: NextApiResponse<T>
) => void | Promise<void>;
