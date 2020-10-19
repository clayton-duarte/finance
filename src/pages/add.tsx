import React, {
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import LoadingPage from "../components/LoadingPage";
import { useAccounts } from "../providers/accounts";
import { Currencies, Account } from "../types";
import Template from "../components/Template";
import { useRates } from "../providers/rates";
import { styled } from "../providers/theme";
import Select from "../components/Select";
import Input from "../components/Input";
import Title from "../components/Title";
import Label from "../components/Label";

const FormWrapper = styled.div`
  color: ${(props) => props.theme.palette.PRIMARY};
  display: grid;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  grid-template-columns: 1fr auto;
  display: grid;
  gap: 1rem;
`;

const initialData: Account = {
  currency: Currencies.CAD,
  email: undefined,
  amount: null,
  name: "",
};

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts, postAccount } = useAccounts();
  const [formData, setFormData] = useState<Account>(initialData);
  const { rates, getRates } = useRates();
  const router = useRouter();

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  useEffect(() => {
    getRates();
  }, [rates]);

  if (!accounts || !rates) return <LoadingPage />;

  const handleChangeCurrency = (value: Currencies) => {
    setFormData({ ...formData, currency: value });
  };

  const handleChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
              await postAccount(formData);
              router.push("/");
            }}
          />
        </>
      }
    >
      <Title>add new account</Title>
      <FormWrapper>
        <Label>Account Name</Label>
        <Input
          placeholder="Some bank name"
          onChange={handleChangeData}
          value={formData.name}
          name="name"
        />
        <Label>Account Balance</Label>
        <InputWrapper>
          <Input
            onChange={handleChangeData}
            value={formData.amount}
            placeholder="10.00"
            type="number"
            name="amount"
          />
          <Select
            options={Object.values(Currencies)}
            currentValue={formData.currency}
            onChange={handleChangeCurrency}
          />
        </InputWrapper>
      </FormWrapper>
    </Template>
  );
};

export default TablesPage;
