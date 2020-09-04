import { FormatFunction } from "i18next";
import Big from "big.js";

import { CurrencyToLocale, Locales } from "../types";

// SETUP
const formatCurrency: FormatFunction = (value: Big, lng) => {
  const { format } = new Intl.NumberFormat(lng, {
    currency: CurrencyToLocale[lng],
    style: "currency",
  });

  return format(Number(value));
};

// EXPORTS
export function humanizeBrl(value: Big | number): string {
  return formatCurrency(value, Locales["pt-BR"]);
}

export function humanizeCad(value: Big | number): string {
  return formatCurrency(value, Locales["en-CA"]);
}
