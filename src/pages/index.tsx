import React, { FunctionComponent, useEffect } from "react";
import { FiEdit, FiRefreshCw, FiGlobe, FiPlusSquare } from "react-icons/fi";
import { useRouter } from "next/router";

import { humanizeBrl, humanizeCad } from "../libs/format";
import BalanceGraph from "../components/BalanceGraph";
import LoadingPage from "../components/LoadingPage";
import ResumeTable from "../components/ResumeTable";
import { useAccounts } from "../providers/accounts";
import { useCurrency } from "../providers/currency";
import NoAccounts from "../components/NoAccounts";
import { useRates } from "../providers/rates";
import Template from "../components/Template";
import SubTitle from "../components/SubTitle";
import BigTotal from "../components/BigTotal";

import { Currencies } from "../types";
import Grid from "../components/Grid";

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts } = useAccounts();
  const { currency, setCurrency } = useCurrency();
  const { rates, getRates } = useRates();
  const router = useRouter();

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    getRates();
  }, [rates]);

  const renderContent = () => {
    if (accounts.length < 1) {
      return (
        <Grid area="title" gap="1rem">
          <NoAccounts />
        </Grid>
      );
    }

    return (
      <>
        <Grid area="title">
          <BigTotal />
        </Grid>

        <Grid gap="1rem">
          <SubTitle>
            <span>Canada</span>
            <span>
              {rates && `${humanizeCad(1)} = ${humanizeBrl(rates.BRL)}`}
            </span>
            <span>Brazil</span>
          </SubTitle>
          <BalanceGraph />
        </Grid>

        <Grid gap="1rem">
          <SubTitle>
            <span>Accounts</span>
            <span />
            <span>Balances</span>
          </SubTitle>
          <ResumeTable />
        </Grid>
      </>
    );
  };

  if (!accounts || !rates) return <LoadingPage />;

  return (
    <Template
      footerActions={[
        <FiGlobe
          key="lang"
          role="button"
          onClick={() => {
            return currency === Currencies.CAD
              ? setCurrency(Currencies.BRL)
              : setCurrency(Currencies.CAD);
          }}
        />,
        <FiEdit
          key="edit"
          role="button"
          onClick={() => {
            router.push("/edit");
          }}
        />,
        <FiPlusSquare
          key="add"
          role="button"
          onClick={() => {
            router.push("/add");
          }}
        />,
        <FiRefreshCw
          key="refresh"
          role="button"
          onClick={() => {
            router.reload();
          }}
        />,
      ]}
    >
      {renderContent()}
    </Template>
  );
};

export default TablesPage;
