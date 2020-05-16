import React, {
  FunctionComponent,
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import { useMagic } from "../providers/magic";
import { styled } from "../providers/theme";
import Button from "./Button";
import Title from "./Title";
import Input from "./Input";

const Template = styled.form`
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
  const [email, setEmail] = useState<string>("");
  const disabled = email.length < 5;
  const { login } = useMagic();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!disabled) login(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Template onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input
        placeholder="your@email.com"
        onChange={handleChange}
        value={email}
        type="email"
        name="email"
      />
      <Button disabled={disabled} type="submit">
        send me a magic link
      </Button>
    </Template>
  );
};

export default LoginPage;
