import React, { FunctionComponent } from "react";
import { signIn } from "next-auth/client";

import { styled } from "../providers/theme";
import Button from "./Button";
import Title from "./Title";

const Wrapper = styled.div`
  align-content: center;
  max-width: 375px;
  margin: 0 auto;
  display: grid;
  padding: 1rem;
  height: 100%;
  width: 100%;
  gap: 1rem;
`;

const LoginPage: FunctionComponent = () => {
  return (
    <Wrapper>
      <Title>Please Login</Title>
      <Button onClick={() => signIn("cognito")}>Login</Button>
    </Wrapper>
  );
};

export default LoginPage;
