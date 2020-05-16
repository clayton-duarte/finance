import React, { FunctionComponent, useEffect } from "react";
import { FiEdit, FiRefreshCw, FiGlobe } from "react-icons/fi";
import { useRouter } from "next/router";

import { humanizeBrl, humanizeCad } from "../src/lib/format";
import BalanceGraph from "../src/components/BalanceGraph";
import LoadingPage from "../src/components/LoadingPage";
import ResumeTable from "../src/components/ResumeTable";
import { useAccounts } from "../src/providers/accounts";
import { useCurrency } from "../src/providers/currency";
import { useRates } from "../src/providers/rates";
import Template from "../src/components/Template";
import SubTitle from "../src/components/SubTitle";
import BigTotal from "../src/components/BigTotal";
import { Currencies } from "../src/types/enums";
import Title from "../src/components/Title";
import Grid from "../src/components/Grid";

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts } = useAccounts();
  const { currency, setCurrency } = useCurrency();
  const { rates, getRates } = useRates();
  const router = useRouter();

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  useEffect(() => {
    getRates();
  }, [rates]);

  if (!accounts || !rates) return <LoadingPage />;

  return (
    <Template
      footerChildren={
        <>
          <FiGlobe
            role="button"
            onClick={() => {
              return currency === Currencies.CAD
                ? setCurrency(Currencies.BRL)
                : setCurrency(Currencies.CAD);
            }}
          />
          <FiEdit
            role="button"
            onClick={() => {
              router.push("/edit");
            }}
          />
          <FiRefreshCw
            role="button"
            onClick={() => {
              router.reload();
            }}
          />
        </>
      }
    >
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
    </Template>
  );
};

export default TablesPage;
