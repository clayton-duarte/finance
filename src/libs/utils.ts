import { Account } from "../types";

// EXPORTS
export function compareAccountByName(a: Account, b: Account): number {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}