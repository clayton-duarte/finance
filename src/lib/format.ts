import { FormatFunction } from "i18next";

import { CurrencyToLocale, Locales } from "../types";

const formatCurrency: FormatFunction = (value, lng) => {
  const { format } = new Intl.NumberFormat(lng, {
    currency: CurrencyToLocale[lng],
    style: "currency",
  });

  return format(Number(value));
};

const humanizeBrl = (value: number): string => {
  return formatCurrency(value, Locales["pt-BR"]);
};

const humanizeCad = (value: number): string => {
  return formatCurrency(value, Locales["en-CA"]);
};

export { humanizeBrl, humanizeCad };
