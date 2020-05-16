import { Account, RatesResponse } from "../types";
import { Currencies } from "../types";

const toCad = (rates: RatesResponse, { currency, amount }: Account): number => {
  return currency === Currencies.CAD ? amount : amount / rates.BRL;
};

const toBrl = (rates: RatesResponse, { currency, amount }: Account): number => {
  return currency === Currencies.BRL ? amount : amount * rates.BRL;
};

const compareAccountByName = (a: Account, b: Account): number => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

export { compareAccountByName, toCad, toBrl };
