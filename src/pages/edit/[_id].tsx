import React, {
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import InputAmount from "../../components/InputAmount";
import LoadingPage from "../../components/LoadingPage";
import { useAccounts } from "../../providers/accounts";
import { Currencies, Account } from "../../types";
import Template from "../../components/Template";
import { styled } from "../../providers/theme";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Label from "../../components/Label";

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

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts, updateAccount } = useAccounts();
  const [formData, setFormData] = useState<Account>(null);
  const router = useRouter();

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  useEffect(() => {
    if (accounts) {
      setFormData(accounts.find(({ _id }) => _id === router.query._id));
    }
  }, [accounts]);

  if (!accounts || !formData) return <LoadingPage />;

  const handleChangeCurrency = (value: Currencies) => {
    setFormData({ ...formData, currency: value });
  };

  const handleChangeAmount = (value: string | number) => {
    setFormData({ ...formData, amount: value });
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
              router.push("/edit");
            }}
          />
          <span />
          <FiCheck
            role="button"
            onClick={async () => {
              await updateAccount(formData);
              router.push("/");
            }}
          />
        </>
      }
    >
      <Title>edit account</Title>
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
      </FormWrapper>
    </Template>
  );
};

export default TablesPage;
