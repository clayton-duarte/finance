import React, { FunctionComponent } from "react";

import { compareAccountByName, toCad, toBrl } from "../lib/math";
import { humanizeBrl, humanizeCad } from "../lib/format";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { Currencies } from "../types/enums";
import { useRates } from "../providers/rates";
import { styled } from "../providers/theme";

const StyledTable = styled.table`
  border-radius: ${(props) => props.theme.shape.radius};
  border-collapse: collapse;
  overflow: hidden;
  max-width: 100%;
  width: 100%;

  th {
    color: ${(props) => props.theme.palette.PRIMARY};
  }

  td {
    border: 2px solid ${(props) => props.theme.palette.SECONDARY};
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    text-align: right;
    width: 50%;
  }

  td.total {
    background: ${(props) => props.theme.palette.SECONDARY};
    color: ${(props) => props.theme.palette.BG};
  }

  td.title {
    text-align: left;
  }

  button {
    margin-top: 1rem;
  }
`;

const ResumeTable: FunctionComponent = () => {
  const { currency } = useCurrency();
  const { accounts } = useAccounts();
  const { rates } = useRates();

  if (!accounts || !rates) return null;

  const renderAccounts = () =>
    accounts.sort(compareAccountByName).map((account) => (
      <tr key={account.name}>
        <td className="title">{account.name}</td>
        <td>
          {currency === Currencies.CAD
            ? humanizeCad(toCad(rates, account))
            : humanizeBrl(toBrl(rates, account))}
        </td>
      </tr>
    ));

  const renderTotal = () => {
    const totalCad = () => accounts.reduce((a, b) => a + toCad(rates, b), 0);
    const totalBrl = () => accounts.reduce((a, b) => a + toBrl(rates, b), 0);

    return (
      <tr>
        <td className="total title">Total</td>
        <td className="total">
          {currency === Currencies.CAD
            ? humanizeCad(totalCad())
            : humanizeBrl(totalBrl())}
        </td>
      </tr>
    );
  };

  return (
    <>
      <StyledTable>
        <tbody>
          {renderTotal()}
          {renderAccounts()}
        </tbody>
      </StyledTable>
    </>
  );
};

export default ResumeTable;
