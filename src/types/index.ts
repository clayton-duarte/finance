// Enums
export enum Currencies {
  CAD = 'CAD',
  BRL = 'BRL',
}

export enum Locales {
  'en-CA' = 'en-CA',
  'pt-BR' = 'pt-BR',
}

export enum CurrencyToLocale {
  'en-CA' = Currencies.CAD,
  'pt-BR' = Currencies.BRL,
}

export enum ReqMethods {
  DELETE = 'DELETE',
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
}

// Interfaces
export interface LoginData {
  username: string
  password: string
}

export interface Account {
  amount: number | string
  currency: Currencies
  email: string
  name: string
  _id?: string
}

export interface Profile {
  share?: string
  email: string
  name: string
  _id?: string
}

export interface ExchangeResponse {
  base: Currencies.CAD
  date: string
  rates: {
    [Currencies.BRL]: number
  }
}

export type RatesResponse = ExchangeResponse['rates']
