import React, { FunctionComponent } from "react";
import * as CurrencyFormat from "react-currency-format";

import { styled } from "../providers/theme";
import { Currencies } from "../types";

const StyledCurrencyFormat = styled(CurrencyFormat)`
  border: 2px solid ${(props) => props.theme.palette.SECONDARY};
  font-family: ${(props) => props.theme.fontFamily.regular};
  border-radius: ${(props) => props.theme.shape.radius};
  color: ${(props) => props.theme.palette.TEXT};
  padding: 0.25rem 1rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

interface InputAmountProps {
  onChange?: (value: string | number) => void;
  value?: string | number;
  currency: Currencies;
}

interface InputValues {
  formattedValue: string;
  floatValue: number;
  value: string;
}

const InputAmount: FunctionComponent<InputAmountProps> = ({
  onChange,
  currency,
  value,
}) => {
  const isCad = currency === Currencies.CAD;

  const handleValueChange = ({ floatValue }: InputValues) => {
    onChange(floatValue || "");
  };

  return (
    <StyledCurrencyFormat
      placeholder={isCad ? "$ 0.00" : "R$ 0,00"}
      thousandSeparator={isCad ? "," : "."}
      decimalSeparator={isCad ? "." : ","}
      onValueChange={handleValueChange}
      prefix={isCad ? "$" : "R$"}
      allowNegative={false}
      fixedDecimalScale
      decimalScale={2}
      value={value}
      name="amount"
    />
  );
};

export default InputAmount;
