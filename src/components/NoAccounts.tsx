import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Button from "./Button";

const Message = styled.p`
  text-align: center;
  font-size: 1.25rem;
  margin: 0;
`;

const NoAccounts = () => {
  const router = useRouter();

  return (
    <>
      <Message>You don't have any account yet</Message>
      <Button onClick={() => router.push("/add")}>Add an account</Button>
    </>
  );
};

export default NoAccounts;
