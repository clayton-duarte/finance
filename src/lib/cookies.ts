import Cookie from "universal-cookie";

import { Currencies } from "../types/enums";

export enum CookieNames {
  CURRENCY = "preferred-currency",
}

export const useCookies = () => {
  const cookie = new Cookie();

  const setCurrencyCookie = (currency: Currencies) => {
    cookie.set(CookieNames.CURRENCY, currency, { path: "/" });
  };

  const getCurrencyCookie = (): Currencies => {
    const currency = cookie.get(CookieNames.CURRENCY);
    if (Object.values(Currencies).includes(currency)) return currency;
    return null;
  };

  return { setCurrencyCookie, getCurrencyCookie };
};
