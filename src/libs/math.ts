import { useEffect } from "react";
import Big from "big.js";

import { useCurrency } from "../providers/currency";
import { useAccounts } from "../providers/accounts";
import { Account, Currencies } from "../types";
import { useRates } from "../providers/rates";

export const useMath = () => {
  const { accounts: defaultAccounts, getAccounts } = useAccounts();
  const { currency: currentCurrency } = useCurrency();
  const { rates, getRates } = useRates();

  useEffect(() => {
    if (!defaultAccounts) getAccounts();
    if (!rates) getRates();
  }, []);

  const toCad = (account: Account): Big => {
    return Big(account.amount).div(
      account.currency === Currencies.BRL ? Big(rates.BRL) : Big(1)
    );
  };

  const toBrl = (account: Account): Big => {
    return Big(account.amount).times(
      account.currency === Currencies.CAD ? Big(rates.BRL) : Big(1)
    );
  };

  const allToCad = (accounts: Account[] = defaultAccounts): Big[] => {
    return accounts.map((account) => toCad(account));
  };

  const allToBrl = (accounts: Account[] = defaultAccounts): Big[] => {
    return accounts.map((account) => toBrl(account));
  };

  const reduceTotal = (values: Big[]): Big => {
    return values.reduce((acc, curr): Big => acc.plus(curr), Big(0));
  };

  const totalInCad = (accounts: Account[] = defaultAccounts): Big => {
    return reduceTotal(allToCad(accounts));
  };

  const totalInBrl = (accounts: Account[] = defaultAccounts): Big => {
    return reduceTotal(allToBrl(accounts));
  };

  const filterAccountByCurrency = (selectedCurrency: Currencies): Account[] => {
    return defaultAccounts.filter(({ currency: accountCurrency }) => {
      return accountCurrency === selectedCurrency;
    });
  };

  const totalByCurrency = (selectedCurrency: Currencies): Big => {
    const filteredAccounts = filterAccountByCurrency(selectedCurrency);

    return currentCurrency === Currencies.CAD
      ? totalInCad(filteredAccounts)
      : totalInBrl(filteredAccounts);
  };

  return {
    totalByCurrency,
    reduceTotal,
    totalInCad,
    totalInBrl,
    allToCad,
    allToBrl,
    toCad,
    toBrl,
  };
};
