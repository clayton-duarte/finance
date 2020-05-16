import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { useRouter } from "next/router";

import { useAuth } from "../providers/auth";
import { styled } from "../providers/theme";
import Title from "./Title";
import Button from "./Button";
import Input from "./Input";

const StyledForm = styled.form`
  grid-template-areas:
    "title"
    "rest";
  justify-content: stretch;
  align-content: center;
  max-width: 20rem;
  padding: 0 1rem;
  margin: 0 auto;
  display: grid;
  height: 100%;
  gap: 1rem;
`;

const LoginForm: FunctionComponent = () => {
  const [formData, setFormData] = useState({});
  const { login } = useAuth(useRouter());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Title>Finance</Title>
      <Input
        onChange={handleChange}
        placeholder="username"
        name="username"
        required
      />
      <Input
        onChange={handleChange}
        placeholder="password"
        name="password"
        type="password"
        required
      />
      <Button type="submit">login</Button>
    </StyledForm>
  );
};

export default LoginForm;
