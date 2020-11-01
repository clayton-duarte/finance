import React, { FunctionComponent, useEffect, MouseEvent } from "react";
import {
  FiPlusSquare,
  FiArrowLeft,
  FiTrash2,
  FiEdit,
  FiLink,
} from "react-icons/fi";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Big from "big.js";

import { humanizeBrl, humanizeCad } from "../../libs/format";
import LoadingPage from "../../components/LoadingPage";
import { useAccounts } from "../../providers/accounts";
import NoAccounts from "../../components/NoAccounts";
import { Currencies, Account } from "../../types";
import Template from "../../components/Template";
import { styled } from "../../providers/theme";
import Title from "../../components/Title";
import Label from "../../components/Label";
import { useSort } from "../../libs/sort";
import Grid from "../../components/Grid";

const Card = styled.section<{ disabled: boolean }>`
  border-radius: ${(props) => props.theme.shape.radius};
  box-shadow: ${(props) => props.theme.shape.shadow};
  color: ${(props) => props.theme.palette.PRIMARY};
  grid-template-columns: auto 1fr auto;
  column-gap: 1rem;
  row-gap: 0.5rem;
  display: grid;
  padding: 1rem;
  margin: 0;
  > svg {
    color: ${(props) => props.theme.palette.SECONDARY};
    align-self: center;
    font-size: 1.5rem;
  }
  ${(props) =>
    props.disabled &&
    `
  filter: grayscale(100%);
  pointer-events: none;
  `}
`;

const StyledText = styled.p`
  margin: 0;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.theme.palette.SECONDARY};
  text-transform: lowercase;
  font-size: 0.75rem;
`;

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts } = useAccounts();
  const [session, loading] = useSession();
  const router = useRouter();
  const { sortAccounts } = useSort(session?.user?.email);

  useEffect(() => {
    getAccounts();
  }, []);

  if (!accounts || loading) return <LoadingPage />;

  const handleClickEdit = (_id: string) => (e: MouseEvent) => {
    router.push("/edit/[_id]", `/edit/${_id}`);
    e.stopPropagation();
  };

  const handleClickDelete = (_id: string) => (e: MouseEvent) => {
    router.push("/delete/[_id]", `/delete/${_id}`);
    e.stopPropagation();
  };

  const renderAccounts = () => {
    if (accounts.length < 1) {
      return <NoAccounts />;
    }
    return accounts.sort(sortAccounts).map((account: Account) => {
      const { _id, name, amount, currency, email } = account;
      const isExternalAccount = email !== session?.user?.email;
      const humanizedAmount = () => {
        return currency === Currencies.CAD
          ? humanizeCad(Big(amount))
          : humanizeBrl(Big(amount));
      };

      return (
        <Card
          disabled={isExternalAccount}
          onClick={handleClickEdit(_id)}
          key={_id}
        >
          {!isExternalAccount ? (
            <FiTrash2 role="button" onClick={handleClickDelete(_id)} />
          ) : (
            <FiLink />
          )}
          <Grid>
            <Label>
              {name} {isExternalAccount && <StyledSpan>({email})</StyledSpan>}
            </Label>
            <StyledText>{humanizedAmount()}</StyledText>
          </Grid>
          {!isExternalAccount && (
            <FiEdit role="button" onClick={handleClickEdit(_id)} />
          )}
        </Card>
      );
    });
  };

  return (
    <Template
      footerActions={[
        <FiArrowLeft
          role="button"
          onClick={() => {
            router.push("/");
          }}
        />,
        <FiPlusSquare
          role="button"
          onClick={() => {
            router.push("/add");
          }}
        />,
      ]}
    >
      <Title>Edit accounts</Title>
      {renderAccounts()}
    </Template>
  );
};

export default TablesPage;
