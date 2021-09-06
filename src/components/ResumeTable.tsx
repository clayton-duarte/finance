import React, { FunctionComponent } from 'react'
import { useSession } from 'next-auth/client'
import { FiLink } from 'react-icons/fi'
import Link from 'next/link'

import { humanizeBrl, humanizeCad } from '../libs/format'
import { useCurrency } from '../providers/currency'
import Table from '../components/Table'
import { useMath } from '../libs/math'
import { useSort } from '../libs/sort'
import { Account, Currencies, RatesResponse } from '../types'
import Grid from '../components/Grid'
import SubTitle from './SubTitle'

const ResumeTable: FunctionComponent<{
  rates: RatesResponse
  accounts: Account[]
}> = ({ rates, accounts }) => {
  const [session] = useSession()
  const { currency } = useCurrency()

  const { toBrl, toCad, totalInCad, totalInBrl } = useMath(accounts, rates)
  const { sortAccounts } = useSort(session?.user?.email, accounts, rates)

  const renderAccounts = () => {
    return accounts.sort(sortAccounts).map((account) => {
      const isExternalAccount = account.email !== session?.user?.email
      return (
        <tr key={account._id}>
          <td className="title">
            {isExternalAccount && <FiLink />} {account.name}
          </td>
          <td>
            {currency === Currencies.CAD
              ? humanizeCad(toCad(account))
              : humanizeBrl(toBrl(account))}
          </td>
        </tr>
      )
    })
  }

  const renderTotal = () => {
    const totalCad = totalInCad(accounts)
    const totalBrl = totalInBrl(accounts)

    return (
      <tr>
        <td>Total</td>
        <td>
          {currency === Currencies.CAD
            ? humanizeCad(totalCad)
            : humanizeBrl(totalBrl)}
        </td>
      </tr>
    )
  }

  return (
    <Link passHref href="/edit">
      <Grid gap="1rem">
        <SubTitle>
          <span>Account</span>
          <span />
          <span>Balance</span>
        </SubTitle>
        <Table>
          <thead>{renderTotal()}</thead>
          <tbody>{renderAccounts()}</tbody>
        </Table>
      </Grid>
    </Link>
  )
}

export default ResumeTable
