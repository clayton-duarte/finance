import Big from "big.js";

import { Account, RatesResponse, Currencies } from "../types";

// SETUP
function getRate(currency: Currencies, rates: RatesResponse): Big {
  if (currency === Currencies.CAD) return Big(1);
  return Big(rates.BRL);
}

// EXPORTS
export function toCad(rates: RatesResponse, account: Account): Big {
  const rate = getRate(account.currency, rates);
  const amount = Big(account.amount);

  return amount.div(rate);
}

export function allToCad(rates: RatesResponse, accounts: Account[]): Big[] {
  return accounts.map((account) => {
    const amountInCad = toCad(rates, account);
    return amountInCad;
  });
}

export function toBrl(rates: RatesResponse, account: Account): Big {
  const rate = getRate(account.currency, rates);
  const amount = Big(account.amount);

  return amount.times(rate);
}

export function allToBrl(rates: RatesResponse, accounts: Account[]): Big[] {
  return accounts.map((account) => {
    const amountInCad = toBrl(rates, account);
    return amountInCad;
  });
}

export function reduceTotal(values: Big[]): Big {
  return values.reduce((acc, currentValue): Big => {
    return acc.plus(currentValue);
  }, Big(0));
}

export function totalInCad(rates: RatesResponse, accounts: Account[]): Big {
  return reduceTotal(allToCad(rates, accounts));
}

export function totalInBrl(rates: RatesResponse, accounts: Account[]): Big {
  return reduceTotal(allToBrl(rates, accounts));
}

export function filterAccountByCurrency(
  accounts: Account[],
  selectedCurrency: Currencies
): Account[] {
  return accounts.filter(({ currency: accountCurrency }) => {
    return accountCurrency === selectedCurrency;
  });
}

export function totalByCurrency(
  rates: RatesResponse,
  accounts: Account[],
  selectedCurrency: Currencies,
  currentCurrency: Currencies
): Big {
  const filteredAccounts = filterAccountByCurrency(accounts, selectedCurrency);
  if (currentCurrency === Currencies.CAD) {
    return totalInCad(rates, filteredAccounts);
  }
  return totalInBrl(rates, filteredAccounts);
}
