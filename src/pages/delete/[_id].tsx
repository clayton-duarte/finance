import React, { FunctionComponent, useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import LoadingPage from "../../components/LoadingPage";
import { useAccounts } from "../../providers/accounts";
import Template from "../../components/Template";
import { useRates } from "../../providers/rates";
import { styled } from "../../providers/theme";
import Title from "../../components/Title";
import { Account } from "../../types";

const StyledForm = styled.form``;

const StyledText = styled.p`
  font-size: 1.125rem;
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
  }, [accounts]);

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
      footerChildren={
        <>
          <FiX
            role="button"
            onClick={() => {
              router.push("/");
            }}
          />
          <span />
          <FiCheck
            role="button"
            onClick={async () => {
              await deleteAccount(accountId);
              router.push("/edit");
            }}
          />
        </>
      }
    >
      <StyledForm>
        <Title>Delete account</Title>
        <StyledText>You are about to delete the account:</StyledText>
        <AccountName>{selectedAccount.name}</AccountName>
        <StyledText>Are you sure?</StyledText>
      </StyledForm>
    </Template>
  );
};

export default TablesPage;
