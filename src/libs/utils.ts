import { Account } from "../types";

// EXPORTS

export function sortAccountByAmount(a: Account, b: Account): number {
  if (a.amount > b.amount) return -1;
  if (a.amount < b.amount) return 1;
  return 0;
}

export function sortAccountByName(a: Account, b: Account): number {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

export function sortAccountByEmail(a: Account, b: Account): number {
  if (a.email < b.email) return -1;
  if (a.email > b.email) return 1;
  return 0;
}
