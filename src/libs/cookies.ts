import Cookie from "universal-cookie";

import { Currencies } from "../types";

export enum CookieNames {
  CURRENCY = "preferred-currency",
  TOKEN = "session-token",
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

  const setTokenCookie = (token: string) => {
    cookie.set(CookieNames.TOKEN, token, { path: "/" });
  };

  const getTokenCookie = (): string => {
    const token = cookie.get(CookieNames.TOKEN);
    return token;
  };

  const deleteTokenCookie = (): void => {
    cookie.remove(CookieNames.TOKEN);
  };

  return {
    setCurrencyCookie,
    getCurrencyCookie,
    setTokenCookie,
    getTokenCookie,
    deleteTokenCookie,
  };
};
