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

const InputWrapper = styled.div`
  color: ${(props) => props.theme.palette.PRIMARY};
  grid-template-columns: 1fr auto;
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  display: grid;
  grid-template-areas:
    "input-name input-name"
    "input-amount input-currency";
  > input:first-child {
    grid-area: input-name;
  }
  > input:not(:first-child) {
    grid-area: input-amount;
  }
  > select {
    grid-area: input-currency;
  }
`;

const initialData: Account = {
  currency: Currencies.CAD,
  amount: 0,
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
              router.push("/edit");
            }}
          />
        </>
      }
    >
      <Title>add new account</Title>
      <InputWrapper>
        <Input
          placeholder="new account name"
          onChange={handleChangeData}
          value={formData.name}
          name="name"
        />
        <Input
          onChange={handleChangeData}
          value={formData.amount}
          name="amount"
          type="number"
        />
        <Select
          options={Object.values(Currencies)}
          currentValue={formData.currency}
          onChange={handleChangeCurrency}
        />
      </InputWrapper>
    </Template>
  );
};

export default TablesPage;
