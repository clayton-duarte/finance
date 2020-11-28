import React, { FunctionComponent } from "react";

import { humanizeBrl, humanizeCad } from "../libs/format";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { useRates } from "../providers/rates";
import { styled } from "../providers/theme";
import { useMath } from "../libs/math";
import { Currencies } from "../types";
import Title from "./Title";
import Grid from "./Grid";
import Card from "./Card";

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

  const { totalInCad, totalInBrl } = useMath(accounts, rates);

  if (!accounts || !currency || !rates) return null;

  const calcBigTotal = () => {
    if (currency === Currencies.CAD) {
      return humanizeCad(totalInCad());
    }
    return humanizeBrl(totalInBrl());
  };

  return (
    <Card>
      <Grid gap=".5rem">
        <Title>balance total</Title>
        <StyledText>{calcBigTotal()}</StyledText>
      </Grid>
    </Card>
  );
};

export default BigTotal;
