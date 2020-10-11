import React, { FunctionComponent, useEffect, MouseEvent } from "react";
import { FiArrowLeft, FiTrash2, FiEdit, FiPlusSquare } from "react-icons/fi";
import { useRouter } from "next/router";

import LoadingPage from "../../components/LoadingPage";
import { useAccounts } from "../../providers/accounts";
import Template from "../../components/Template";
import { styled } from "../../providers/theme";
import Title from "../../components/Title";
import Label from "../../components/Label";
import Grid from "../../components/Grid";

const Card = styled.section`
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
`;

const StyledText = styled.p`
  margin: 0;
`;

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts } = useAccounts();
  const router = useRouter();

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  if (!accounts) return <LoadingPage />;

  const handleClickEdit = (_id: string) => (e: MouseEvent) => {
    router.push("/edit/[_id]", `/edit/${_id}`);
    e.stopPropagation();
  };

  const handleClickDelete = (_id: string) => (e: MouseEvent) => {
    router.push("/delete/[_id]", `/delete/${_id}`);
    e.stopPropagation();
  };

  return (
    <Template
      footerChildren={
        <>
          <FiArrowLeft
            role="button"
            onClick={() => {
              router.push("/");
            }}
          />
          <span />
          <FiPlusSquare
            role="button"
            onClick={() => {
              router.push("/add");
            }}
          />
        </>
      }
    >
      <Title>Edit accounts</Title>
      {accounts.map(({ _id, name, amount, currency }) => (
        <Card key={_id} onClick={handleClickEdit(_id)}>
          <FiTrash2 role="button" onClick={handleClickDelete(_id)} />
          <Grid>
            <Label>{name}</Label>
            <StyledText>
              {amount} {currency}
            </StyledText>
          </Grid>
          <FiEdit role="button" onClick={handleClickEdit(_id)} />
        </Card>
      ))}
    </Template>
  );
};

export default TablesPage;
