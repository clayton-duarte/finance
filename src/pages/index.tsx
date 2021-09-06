import React, { FunctionComponent } from 'react'
import { FiEdit, FiGlobe, FiPlusSquare } from 'react-icons/fi'
import { useRouter } from 'next/router'

import { Account, Currencies, RatesResponse } from '../types'
import BalanceGraph from '../components/BalanceGraph'
import ResumeTable from '../components/ResumeTable'
import { useCurrency } from '../providers/currency'
import NoAccounts from '../components/NoAccounts'
import { withSSP } from '../libs/withSSP'
import Template from '../components/Template'
import BigTotal from '../components/BigTotal'
import Grid from '../components/Grid'

interface PageProps {
  rates: RatesResponse
  accounts: Account[]
}

export const getServerSideProps = withSSP(async (_, axios) => {
  const { data: accounts } = await axios.get<Account[]>('/accounts')
  const { data: rates } = await axios.get<RatesResponse>('/rates')
  console.log('>>>>>>>>>>>>>> getServerSideProps')

  return {
    props: {
      accounts,
      rates,
    },
  }
})

const TablesPage: FunctionComponent<PageProps> = ({ accounts }) => {
  const { currency, setCurrency } = useCurrency()
  const router = useRouter()

  const renderContent = () => {
    if (accounts.length < 1) {
      return <NoAccounts />
    }

    return (
      <>
        <BigTotal />
        <Grid gap="1rem">
          <BalanceGraph />
          <ResumeTable />
        </Grid>
      </>
    )
  }

  return (
    <Template
      footerActions={[
        <FiPlusSquare
          key="add"
          role="button"
          onClick={() => {
            router.push('/add')
          }}
        />,
        <FiGlobe
          key="lang"
          role="button"
          onClick={() => {
            return currency === Currencies.CAD
              ? setCurrency(Currencies.BRL)
              : setCurrency(Currencies.CAD)
          }}
        />,
        <FiEdit
          key="edit"
          role="button"
          onClick={() => {
            router.push('/edit')
          }}
        />,
      ]}
    >
      {renderContent()}
    </Template>
  )
}

export default TablesPage
