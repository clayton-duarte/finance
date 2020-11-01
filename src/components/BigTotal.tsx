import React, { FunctionComponent } from "react";

import { humanizeBrl, humanizeCad } from "../libs/format";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { useRates } from "../providers/rates";
import { styled } from "../providers/theme";
import { useMath } from "../libs/math";
import { Currencies } from "../types";

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
  const { totalInCad, totalInBrl } = useMath();
  const { accounts } = useAccounts();
  const { currency } = useCurrency();
  const { rates } = useRates();

  if (!accounts || !currency || !rates) return null;

  const calcBigTotal = () => {
    if (currency === Currencies.CAD) {
      return humanizeCad(totalInCad());
    }
    return humanizeBrl(totalInBrl());
  };

  const bigTotal = calcBigTotal();

  return (
    <>
      <StyledTitle>balance total</StyledTitle>
      <StyledText>{bigTotal}</StyledText>
    </>
  );
};

export default BigTotal;
