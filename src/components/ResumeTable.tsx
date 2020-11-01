import React, { FunctionComponent } from "react";
import { useSession } from "next-auth/client";
import { FiLink } from "react-icons/fi";
import Link from "next/link";

import { humanizeBrl, humanizeCad } from "../libs/format";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import { useRates } from "../providers/rates";
import Table from "../components/Table";
import { useMath } from "../libs/math";
import { Currencies } from "../types";

const ResumeTable: FunctionComponent = () => {
  const { toBrl, toCad, totalInCad, totalInBrl } = useMath();
  const [session, loading] = useSession();
  const { currency } = useCurrency();
  const { accounts } = useAccounts();
  const { rates } = useRates();

  if (!accounts || !rates || loading) return null;

  const renderAccounts = () => {
    return accounts.map((account) => {
      const isExternalAccount = account.email !== session?.user?.email;
      return (
        <tr key={account.name}>
          <td className="title">
            {isExternalAccount && <FiLink />} {account.name}
          </td>
          <td>
            {currency === Currencies.CAD
              ? humanizeCad(toCad(account))
              : humanizeBrl(toBrl(account))}
          </td>
        </tr>
      );
    });
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
