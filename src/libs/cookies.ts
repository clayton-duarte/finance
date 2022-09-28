import Cookie, { CookieSetOptions } from "universal-cookie";

import { Currencies } from "../types";

export enum CookieNames {
  CURRENCY = "preferred-currency",
  TOKEN = "session-token",
}

const cookieOptions: CookieSetOptions = {
  sameSite: "none",
  path: "/",
} as const;

export const useCookies = () => {
  const cookie = new Cookie();

  const setCurrencyCookie = (currency: Currencies) => {
    return cookie.set(CookieNames.CURRENCY, currency, cookieOptions);
  };

  const getCurrencyCookie = (): Currencies => {
    const currency = cookie.get(CookieNames.CURRENCY);
    if (Object.values(Currencies).includes(currency)) return currency;
    return null;
  };

  const setTokenCookie = (token: string) => {
    return cookie.set(CookieNames.TOKEN, token, cookieOptions);
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
    deleteTokenCookie,
    setTokenCookie,
    getTokenCookie,
  };
};
