import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

// Enums
export enum Currencies {
  CAD = "CAD",
  BRL = "BRL",
}

export enum Locales {
  "en-CA" = "en-CA",
  "pt-BR" = "pt-BR",
}

export enum CurrencyToLocale {
  "en-CA" = Currencies.CAD,
  "pt-BR" = Currencies.BRL,
}

export enum ReqMethods {
  DELETE = "DELETE",
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
}

// Interfaces
export interface LoginData {
  username: string;
  password: string;
}

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
