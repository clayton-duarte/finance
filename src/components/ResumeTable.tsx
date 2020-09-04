import React, { FunctionComponent } from "react";

import { toCad, toBrl, totalInBrl, totalInCad } from "../libs/math";
import { humanizeBrl, humanizeCad } from "../libs/format";
import { compareAccountByName } from "../libs/utils";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { useRates } from "../providers/rates";
import { styled } from "../providers/theme";
import { Currencies } from "../types";

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
`;

const ResumeTable: FunctionComponent = () => {
  const { currency } = useCurrency();
  const { accounts } = useAccounts();
  const { rates } = useRates();

  if (!accounts || !rates) return null;

  const renderAccounts = () => {
    return accounts.sort(compareAccountByName).map((account) => (
      <tr key={account.name}>
        <td className="title">{account.name}</td>
        <td>
          {currency === Currencies.CAD
            ? humanizeCad(toCad(rates, account))
            : humanizeBrl(toBrl(rates, account))}
        </td>
      </tr>
    ));
  };

  const renderTotal = () => {
    const totalCad = totalInCad(rates, accounts);
    const totalBrl = totalInBrl(rates, accounts);

    return (
      <tr>
        <td className="total title">Total</td>
        <td className="total">
          {currency === Currencies.CAD
            ? humanizeCad(totalCad)
            : humanizeBrl(totalBrl)}
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
