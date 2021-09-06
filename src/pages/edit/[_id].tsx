import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'

import InputAmount, { ReturnValue } from '../../components/InputAmount'
import { Currencies, Account } from '../../types'
import Template from '../../components/Template'
import { styled } from '../../providers/theme'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Title from '../../components/Title'
import Label from '../../components/Label'
import Grid from '../../components/Grid'
import { withSSP } from '../../libs/withSSP'
import axios from 'axios'

const InputWrapper = styled.div`
  grid-template-columns: 1fr auto;
  display: grid;
  gap: 1rem;
`

type PageProps = {
  account: Account
}

export const getServerSideProps = withSSP<PageProps>(
  async ({ params }, axios) => {
    const { data: accounts } = await axios.get<Account[]>('/accounts')

    return {
      props: {
        account: accounts.find(({ _id }) => _id === params?._id),
      },
    }
  }
)

const TablesPage: FunctionComponent<PageProps> = ({ account }) => {
  const [formData, setFormData] = useState<Account>(account)
  const router = useRouter()

  const isCad = formData?.currency === Currencies.CAD

  const handleChangeCurrency = (value: Currencies) => {
    setFormData({ ...formData, currency: value })
  }

  const handleChangeAmount = ({ floatValue }: ReturnValue) => {
    setFormData({ ...formData, amount: floatValue })
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value })
  }

  const updateAccount = async () => {
    if (formData.name && formData.name) {
      try {
        await axios.put<Account[]>('/api/accounts', {
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
            router.push('/edit')
          }}
        />,
        <FiCheck key="cancel" role="button" onClick={updateAccount} />,
      ]}
    >
      <Title>edit account</Title>
      <Grid gap=".5rem">
        <Grid gap="1rem">
          <Label>Account Name</Label>
          <Input
            placeholder="Some bank name"
            onChange={handleChangeName}
            value={formData.name}
            name="name"
          />
        </Grid>
        <Grid gap=".5rem">
          <Label>Account Balance</Label>
          <InputWrapper>
            <InputAmount
              thousandSeparator={isCad ? ',' : '.'}
              decimalSeparator={isCad ? '.' : ','}
              onValueChange={handleChangeAmount}
              value={`${formData.amount}`}
              prefix={isCad ? '$' : 'R$'}
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
