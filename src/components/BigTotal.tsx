import React, { FunctionComponent } from "react";

import { humanizeBrl, humanizeCad } from "../lib/format";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { useRates } from "../providers/rates";
import { Currencies } from "../types/enums";
import { styled } from "../providers/theme";
import { toCad, toBrl } from "../lib/math";

const StyledTitle = styled.h3`
  color: ${(props) => props.theme.palette.PRIMARY};
  justify-content: space-around;
  text-transform: uppercase;
  font-size: 1.1rem;
  display: grid;
  margin: 0;
`;

const StyledText = styled.p`
  color: ${(props) => props.theme.palette.PRIMARY};
  justify-content: space-around;
  font-weight: bolder;
  font-size: 2rem;
  display: grid;
  margin: 0;
`;

const BigTotal: FunctionComponent = () => {
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
  const bigTotal = humanizedTotal(cadTotal + brlTotal);

  return (
    <>
      <StyledTitle>balance total</StyledTitle>
      <StyledText>{bigTotal}</StyledText>
    </>
  );
};

export default BigTotal;
