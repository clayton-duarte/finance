import { Account, RatesResponse } from "../types";
import { useMath } from "./math";

export const useSort = (
  userEmail: string,
  accounts: Account[],
  rates: RatesResponse
) => {
  const { toCad } = useMath(accounts, rates);

  const sortAccounts = (a: Account, b: Account) => {
    const toSameCurrency = (account: Account) => {
      return Number(toCad(account));
    };
    if (a.email === userEmail) {
      return toSameCurrency(b) - toSameCurrency(a);
    }
    return 0;
  };
  return { sortAccounts };
};
