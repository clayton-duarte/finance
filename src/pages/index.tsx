import React, { FunctionComponent, useEffect } from 'react'
import { FiEdit, FiGlobe, FiPlusSquare } from 'react-icons/fi'
import { useRouter } from 'next/router'

import BalanceGraph from '../components/BalanceGraph'
import LoadingPage from '../components/LoadingPage'
import ResumeTable from '../components/ResumeTable'
import { useAccounts } from '../providers/accounts'
import { useCurrency } from '../providers/currency'
import NoAccounts from '../components/NoAccounts'
import { useRates } from '../providers/rates'
import Template from '../components/Template'
import BigTotal from '../components/BigTotal'
import Grid from '../components/Grid'
import { Currencies } from '../types'

const TablesPage: FunctionComponent = () => {
  const { accounts, getAccounts } = useAccounts()
  const { currency, setCurrency } = useCurrency()
  const { rates, getRates } = useRates()
  const router = useRouter()

  useEffect(() => {
    getAccounts()
  }, [])

  useEffect(() => {
    getRates()
  }, [rates])

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

  console.log({ accounts, rates })

  if (!accounts || !rates) return <LoadingPage />

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
