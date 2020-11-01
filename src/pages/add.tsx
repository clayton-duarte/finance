import React, {
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import InputAmount from "../components/InputAmount";
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
import Grid from "../components/Grid";

const InputWrapper = styled.div`
  grid-template-columns: 1fr auto;
  display: grid;
  gap: 1rem;
`;

const initialData: Account = {
  currency: Currencies.CAD,
  email: undefined,
  amount: "",
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

  const handleChangeAmount = (value: string | number) => {
    setFormData({ ...formData, amount: value });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  return (
    <Template
      footerActions={[
        <FiX
          role="button"
          onClick={() => {
            router.push("/");
          }}
        />,
        <FiCheck
          role="button"
          onClick={async () => {
            await postAccount(formData);
            router.push("/edit");
          }}
        />,
      ]}
    >
      <Title>add new account</Title>
      <Grid gap="1rem">
        <Label>Account Name</Label>
        <Input
          placeholder="Bank Savings"
          onChange={handleChangeName}
          value={formData.name}
          name="name"
        />
      </Grid>
      <Grid gap="1rem">
        <Label>Account Balance</Label>
        <InputWrapper>
          <InputAmount
            onChange={handleChangeAmount}
            currency={formData.currency}
            value={formData.amount}
          />
          <Select
            options={Object.values(Currencies)}
            currentValue={formData.currency}
            onChange={handleChangeCurrency}
          />
        </InputWrapper>
      </Grid>
    </Template>
  );
};

export default TablesPage;
