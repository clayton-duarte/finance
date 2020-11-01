import { Account } from "../types";
import { useMath } from "./math";

export const useSort = (userEmail: string) => {
  const { toCad } = useMath();

  const sortAccounts = (a: Account, b: Account) => {
    const toSameCurrency = (account: Account) => {
      return Number(toCad(account));
    };
    // if (toSameCurrency(a) > toSameCurrency(b)) {
    //   if (a.email === userEmail) {
    //     return -1;
    //   }
    //   return 0;
    // }
    // if (toSameCurrency(a) < toSameCurrency(b)) {
    //   if (a.email === userEmail) {
    //     return 1;
    //   }
    //   return 0;
    // }
    if (a.email === userEmail) {
      return toSameCurrency(b) - toSameCurrency(a);
    }
    return 0;
  };
  return { sortAccounts };
};
