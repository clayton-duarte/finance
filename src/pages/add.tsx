import React, {
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'

import InputAmount, { ReturnValue } from '../components/InputAmount'
import LoadingPage from '../components/LoadingPage'
import { useAccounts } from '../providers/accounts'
import { Currencies, Account } from '../types'
import Template from '../components/Template'
import { useRates } from '../providers/rates'
import { styled } from '../providers/theme'
import Select from '../components/Select'
import Input from '../components/Input'
import Title from '../components/Title'
import Label from '../components/Label'
import Grid from '../components/Grid'

const InputWrapper = styled.div`
  grid-template-columns: 1fr auto;
  display: grid;
  gap: 1rem;
`

const initialData: Account = {
  currency: Currencies.CAD,
  email: undefined,
  amount: '',
  name: '',
}

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts, postAccount } = useAccounts()
  const [formData, setFormData] = useState<Account>(initialData)
  const { rates, getRates } = useRates()
  const router = useRouter()

  const isCad = formData.currency === Currencies.CAD

  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  useEffect(() => {
    getRates()
  }, [getRates, rates])

  if (!accounts || !rates) return <LoadingPage />

  const handleChangeCurrency = (value: Currencies) => {
    setFormData({ ...formData, currency: value })
  }

  const handleChangeAmount = ({ floatValue }: ReturnValue) => {
    setFormData({ ...formData, amount: floatValue })
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value })
  }

  return (
    <Template
      footerActions={[
        <FiX
          key="cancel"
          role="button"
          onClick={() => {
            router.push('/')
          }}
        />,
        <FiCheck
          key="confirm"
          role="button"
          onClick={async () => {
            await postAccount(formData)
            router.push('/edit')
          }}
        />,
      ]}
    >
      <Title>add new account</Title>
      <Grid gap="1rem">
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
              thousandSeparator={isCad ? ',' : '.'}
              decimalSeparator={isCad ? '.' : ','}
              onValueChange={handleChangeAmount}
              prefix={isCad ? '$' : 'R$'}
              value={`${formData.amount}`}
            />
            <Select
              options={Object.values(Currencies)}
              currentValue={formData.currency}
              onChange={handleChangeCurrency}
            />
          </InputWrapper>
        </Grid>
      </Grid>
    </Template>
  )
}

export default TablesPage
