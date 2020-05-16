import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import LoadingPage from "../src/components/LoadingPage";
import { useAccounts } from "../src/providers/accounts";
import Template from "../src/components/Template";
import { useRates } from "../src/providers/rates";
import { Account } from "../src/types/interfaces";
import { styled } from "../src/providers/theme";
import { Currencies } from "../src/types/enums";
import Select from "../src/components/Select";
import Input from "../src/components/Input";
import Title from "../src/components/Title";

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
  const {
    accounts,
    deleteAccount,
    getAccounts,
    postAccount,
    updateAccounts,
  } = useAccounts();
  const [formData, setFormData] = useState<Account>(initialData);
  const { rates, getRates } = useRates();
  const router = useRouter();
  const accountId = String(router.query._id);

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  useEffect(() => {
    getRates();
  }, [rates]);

  if (!accounts || !rates) return <LoadingPage />;

  const handleChangeCurrency = (value: string) => {
    let updatedData = formData;
    updatedData.currency = value as Currencies;
    setFormData({ ...updatedData });
  };

  const handleChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.name, e.target.value);
    let updatedData = formData;
    updatedData[e.target.name] = e.target.value;
    console.log(updatedData);
    setFormData({ ...updatedData });
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
          onChange={handleChangeData}
          placeholder="new account name"
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
          onChange={handleChangeCurrency}
          options={Object.values(Currencies)}
          currentValue={formData.currency}
        />
      </InputWrapper>
    </Template>
  );
};

export default TablesPage;
