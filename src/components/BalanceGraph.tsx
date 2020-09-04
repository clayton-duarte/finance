import React, { FunctionComponent } from "react";

import { humanizeBrl, humanizeCad } from "../libs/format";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { useRates } from "../providers/rates";
import { styled } from "../providers/theme";
import { toCad, toBrl } from "../libs/math";
import { Currencies } from "../types";

const PercentBar = styled.section<{ percent: number }>`
  background-image: ${({ theme, percent }) =>
    `linear-gradient(
      90deg, 
      ${theme.palette.PRIMARY} ${percent}%, 
      ${theme.palette.SECONDARY} ${percent}%
    )`};
  border-radius: ${(props) => props.theme.shape.radius};
  color: ${(props) => props.theme.palette.BG};
  grid-template-columns: auto auto;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  align-items: center;
  overflow: hidden;
  display: grid;
`;

const BalanceText = styled.span``;

const BalanceGraph: FunctionComponent = () => {
  const { accounts } = useAccounts();
  const { currency } = useCurrency();
  const { rates } = useRates();

  if (!accounts || !currency || !rates) return null;

  const totalByCurrency = (selectedCurrency: Currencies) => {
    const filteredAccounts = accounts.filter(
      ({ currency: accountCurrency }) => accountCurrency === selectedCurrency
    );

    const convertedAccounts = filteredAccounts.map((account) =>
      currency === Currencies.CAD
        ? toCad(rates, account)
        : toBrl(rates, account)
    );

    return convertedAccounts.reduce((prev, curr) => prev + curr, 0);
  };

  const humanizedTotal = (total: number) => {
    return currency === Currencies.CAD
      ? humanizeCad(total)
      : humanizeBrl(total);
  };

  const cadTotal = totalByCurrency(Currencies.CAD);
  const brlTotal = totalByCurrency(Currencies.BRL);
  const percent = (cadTotal / (cadTotal + brlTotal)) * 100;

  return (
    <PercentBar percent={percent}>
      <BalanceText>{humanizedTotal(cadTotal)}</BalanceText>
      <BalanceText>{humanizedTotal(brlTotal)}</BalanceText>
    </PercentBar>
  );
};

export default BalanceGraph;
