import { Account, RatesResponse } from "../types";
import { useMath } from "./math";

interface UseSortParams {
  rates: RatesResponse;
  userEmail: string;
}

export const useSort = ({ userEmail, rates }: UseSortParams) => {
  const { toCad } = useMath();

  const sortAccounts = (a: Account, b: Account) => {
    const realAmount = (account: Account) => {
      //   console.log(toCad(account).valueOf());

      return toCad(account);
    };

    if (realAmount(a) > realAmount(b)) {
      return -1;
    }
    if (realAmount(a) < realAmount(b)) {
      return 1;
    }
    return 0;
  };
  return { sortAccounts };
};
