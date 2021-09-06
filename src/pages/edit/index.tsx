import React, { FunctionComponent, useEffect, MouseEvent } from 'react'
import {
  FiPlusSquare,
  FiArrowLeft,
  FiTrash2,
  FiEdit,
  FiLink,
} from 'react-icons/fi'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Big from 'big.js'

import { humanizeBrl, humanizeCad } from '../../libs/format'
import LoadingPage from '../../components/LoadingPage'
import { useAccounts } from '../../providers/accounts'
import { useRates } from '../../providers/rates'
import NoAccounts from '../../components/NoAccounts'
import { Currencies, Account } from '../../types'
import Template from '../../components/Template'
import { styled } from '../../providers/theme'
import Title from '../../components/Title'
import Label from '../../components/Label'
import { useSort } from '../../libs/sort'
import Card from '../../components/Card'
import Grid from '../../components/Grid'

const StyledText = styled.p`
  margin: 0;
`

const StyledSpan = styled.span`
  color: ${(props) => props.theme.palette.SECONDARY};
  text-transform: lowercase;
  font-size: 0.75rem;
`

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts } = useAccounts()
  const [session, loading] = useSession()
  const { rates, getRates } = useRates()
  const router = useRouter()

  const { sortAccounts } = useSort(session?.user?.email, accounts, rates)

  useEffect(() => {
    getAccounts()
  }, [])

  useEffect(() => {
    if (!rates) getRates()
  }, [rates])

  if (!accounts || !rates || loading) return <LoadingPage />

  const handleClickEdit = (_id: string) => (e: MouseEvent) => {
    router.push('/edit/[_id]', `/edit/${_id}`)
    e.stopPropagation()
  }

  const handleClickDelete = (_id: string) => (e: MouseEvent) => {
    router.push('/delete/[_id]', `/delete/${_id}`)
    e.stopPropagation()
  }

  const renderAccounts = () => {
    if (accounts.length < 1) {
      return <NoAccounts />
    }
    return accounts.sort(sortAccounts).map((account: Account) => {
      const { _id, name, amount, currency, email } = account
      const isExternalAccount = email !== session?.user?.email
      const humanizedAmount = () => {
        return currency === Currencies.CAD
          ? humanizeCad(Big(Number(amount)))
          : humanizeBrl(Big(Number(amount)))
      }

      return (
        <Card
          onClick={handleClickEdit(_id)}
          disabled={isExternalAccount}
          columns="auto 1fr auto"
          key={_id}
        >
          {!isExternalAccount ? (
            <FiEdit role="button" onClick={handleClickEdit(_id)} />
          ) : (
            <FiLink />
          )}
          <Grid>
            <Label>
              {name} {isExternalAccount && <StyledSpan>({email})</StyledSpan>}
            </Label>
            <StyledText>{humanizedAmount()}</StyledText>
          </Grid>
          {!isExternalAccount && (
            <FiTrash2 role="button" onClick={handleClickDelete(_id)} />
          )}
        </Card>
      )
    })
  }

  return (
    <Template
      footerActions={[
        <FiArrowLeft
          key="back"
          role="button"
          onClick={() => {
            router.push('/')
          }}
        />,
        <FiPlusSquare
          key="add"
          role="button"
          onClick={() => {
            router.push('/add')
          }}
        />,
      ]}
    >
      <Title>Edit accounts</Title>
      <Grid>{renderAccounts()}</Grid>
    </Template>
  )
}

export default TablesPage
