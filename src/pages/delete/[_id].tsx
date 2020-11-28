import React, { FunctionComponent, useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import LoadingPage from "../../components/LoadingPage";
import { useAccounts } from "../../providers/accounts";
import Template from "../../components/Template";
import { useRates } from "../../providers/rates";
import { styled } from "../../providers/theme";
import Title from "../../components/Title";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import { Account } from "../../types";

const StyledForm = styled.form``;

const StyledText = styled.p`
  margin: 0;
`;

const AccountName = styled(StyledText)`
  color: ${(props) => props.theme.palette.SECONDARY};
  text-transform: capitalize;
`;

const TablesPage: FunctionComponent = () => {
  const { accounts, deleteAccount, getAccounts } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const { rates, getRates } = useRates();

  const router = useRouter();
  const accountId = String(router.query._id);

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    getRates();
  }, [rates]);

  useEffect(() => {
    if (accounts && accountId) {
      const accountFound = accounts.find((ac) => ac._id === accountId);
      setSelectedAccount(accountFound);
    }
  }, [accountId, accounts]);

  if (!accounts || !selectedAccount) return <LoadingPage />;

  return (
    <Template
      footerActions={[
        <FiX
          key="cancel"
          role="button"
          onClick={() => {
            router.push("/");
          }}
        />,
        <FiCheck
          key="confirm"
          role="button"
          onClick={async () => {
            await deleteAccount(accountId);
            router.push("/edit");
          }}
        />,
      ]}
    >
      <Title>Delete account</Title>
      <Card>
        <StyledForm>
          <Grid gap=".5rem">
            <StyledText>You are about to delete the account:</StyledText>
            <AccountName>{selectedAccount.name}</AccountName>
            <StyledText>Are you sure?</StyledText>
          </Grid>
        </StyledForm>
      </Card>
    </Template>
  );
};

export default TablesPage;
