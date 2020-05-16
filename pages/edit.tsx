import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { FiCheck, FiPlusSquare, FiTrash2, FiX } from "react-icons/fi";
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

const StyledFieldset = styled.section`
  color: ${(props) => props.theme.palette.PRIMARY};
  grid-template-columns: 1fr auto auto;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.5rem;
  display: grid;
  border: none;
  padding: 0;
  margin: 0;
  grid-template-areas:
    "label label label"
    "input select icon";
  > label {
    grid-area: label;
  }
  > input {
    grid-area: input;
  }
  > select {
    grid-area: select;
  }
  > svg {
    align-self: center;
    font-size: 1.25rem;
    grid-area: icon;
  }
`;

const StyledLabel = styled.label`
  text-transform: capitalize;
`;

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts, updateAccounts } = useAccounts();
  const [formData, setFormData] = useState<Account[]>();
  const { rates, getRates } = useRates();
  const router = useRouter();

  useEffect(() => {
    getAccounts();
    setFormData(accounts);
  }, [accounts]);

  useEffect(() => {
    getRates();
  }, [rates]);

  const handleChangeCurrency = (index: number) => (value: string) => {
    let updatedData = formData;
    updatedData[index].currency = value as Currencies;
    setFormData([...updatedData]);
  };

  const handleChangeAmount = (index: number) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    let updatedData = formData;

    updatedData[index][name] = value
      ? type === "number"
        ? Number(value)
        : value
      : "";

    setFormData([...updatedData]);
  };

  if (!accounts || !formData || !rates) return <LoadingPage />;

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
          <FiPlusSquare
            role="button"
            onClick={() => {
              router.push("/add");
            }}
          />
          <FiCheck
            role="button"
            onClick={async () => {
              await updateAccounts(formData);
              router.push("/");
            }}
          />
        </>
      }
    >
      <Title>Update balances</Title>
      {formData.map(({ _id, name, amount, currency }, index) => (
        <StyledFieldset key={_id}>
          <StyledLabel>{name}</StyledLabel>
          <Input
            onChange={handleChangeAmount(index)}
            value={amount}
            name="amount"
            type="number"
            step="0.01"
            min="0.00"
          />
          <Select
            onChange={handleChangeCurrency(index)}
            options={Object.values(Currencies)}
            currentValue={currency}
          />
          <FiTrash2
            role="button"
            onClick={() => {
              router.push("/delete/[_id]", `/delete/${_id}`);
            }}
          />
        </StyledFieldset>
      ))}
    </Template>
  );
};

export default TablesPage;
