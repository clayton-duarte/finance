import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import axios from 'axios'

import InputAmount, { ReturnValue } from '../components/InputAmount'
import { Currencies, Account, RatesResponse } from '../types'
import Template from '../components/Template'
import { styled } from '../providers/theme'
import Select from '../components/Select'
import Input from '../components/Input'
import Title from '../components/Title'
import Label from '../components/Label'
import Grid from '../components/Grid'
import { withSSP } from '../libs/withSSP'

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

interface PageProps {
  rates: RatesResponse
  accounts: Account[]
}

export const getServerSideProps = withSSP(async (_, axios) => {
  const { data: accounts } = await axios.get<Account[]>('/accounts')
  const { data: rates } = await axios.get<RatesResponse>('/rates')
  console.log({
    accounts,
    rates,
  })

  return {
    props: {
      accounts,
      rates,
    },
  }
})

const TablesPage: FunctionComponent<PageProps> = ({ rates, accounts }) => {
  const [formData, setFormData] = useState<Account>(initialData)
  const router = useRouter()

  const isCad = formData.currency === Currencies.CAD

  const handleChangeCurrency = (value: Currencies) => {
    setFormData({ ...formData, currency: value })
  }

  const handleChangeAmount = ({ floatValue }: ReturnValue) => {
    setFormData({ ...formData, amount: floatValue })
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value })
  }

  const postAccount = async () => {
    if (formData.name && formData.name) {
      try {
        await axios.post<Account[]>('/api/accounts', {
          account: formData,
        })
        router.push('/edit')
      } catch (err) {
        console.log(err)
      }
    }
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
        <FiCheck key="confirm" role="button" onClick={postAccount} />,
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
