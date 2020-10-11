import React, { FunctionComponent } from "react";
import Link from "next/link";

import { humanizeBrl, humanizeCad } from "../libs/format";
import { compareAccountByName } from "../libs/utils";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { useRates } from "../providers/rates";
import Table from "../components/Table";
import { useMath } from "../libs/math";
import { Currencies } from "../types";

const ResumeTable: FunctionComponent = () => {
  const { currency } = useCurrency();
  const { accounts } = useAccounts();
  const { rates } = useRates();
  const { toBrl, toCad, totalInCad, totalInBrl } = useMath();

  if (!accounts || !rates) return null;

  const renderAccounts = () => {
    return accounts.sort(compareAccountByName).map((account) => (
      <tr key={account.name}>
        <td className="title">{account.name}</td>
        <td>
          {currency === Currencies.CAD
            ? humanizeCad(toCad(account))
            : humanizeBrl(toBrl(account))}
        </td>
      </tr>
    ));
  };

  const renderTotal = () => {
    const totalCad = totalInCad(accounts);
    const totalBrl = totalInBrl(accounts);

    return (
      <tr>
        <td>Total</td>
        <td>
          {currency === Currencies.CAD
            ? humanizeCad(totalCad)
            : humanizeBrl(totalBrl)}
        </td>
      </tr>
    );
  };

  return (
    <Link href="/edit">
      <Table>
        <thead>{renderTotal()}</thead>
        <tbody>{renderAccounts()}</tbody>
      </Table>
    </Link>
  );
};

export default ResumeTable;
