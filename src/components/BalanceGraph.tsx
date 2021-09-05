import React, { FunctionComponent } from 'react'
import Big from 'big.js'

import { humanizeBrl, humanizeCad } from '../libs/format'
import { useAccounts } from '../providers/accounts'
import { useCurrency } from '../providers/currency'
import { useRates } from '../providers/rates'
import { styled } from '../providers/theme'
import { useMath } from '../libs/math'
import { Currencies } from '../types'
import SubTitle from './SubTitle'

const PercentBar = styled.section<{ percent: Big }>`
  background-image: ${({ theme, percent }) =>
    `linear-gradient(
      90deg, 
      ${theme.palette.PRIMARY} ${percent}%, 
      ${theme.palette.SECONDARY} ${percent}%
    )`};
  border-radius: ${(props) => props.theme.shape.radius};
  color: ${(props) => props.theme.palette.BG};
  grid-template-columns: auto auto;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  align-items: center;
  overflow: hidden;
  display: grid;
`

const Text = styled.span``

const SmallText = styled.span`
  font-size: 1rem;
`

const BalanceGraph: FunctionComponent = () => {
  const { accounts } = useAccounts()
  const { currency } = useCurrency()
  const { rates } = useRates()

  const { totalByCurrency } = useMath(accounts, rates)

  if (!accounts || !currency || !rates) return null

  const humanizedTotal = (total: Big) => {
    return currency === Currencies.CAD ? humanizeCad(total) : humanizeBrl(total)
  }

  const cadTotal = totalByCurrency(Currencies.CAD)
  const brlTotal = totalByCurrency(Currencies.BRL)
  const allTotal = cadTotal.plus(brlTotal)

  const isAllTotalZero = Number(allTotal) === 0
  const percent = isAllTotalZero ? allTotal : cadTotal.div(allTotal).times(100)

  return (
    <>
      <SubTitle>
        <Text>Canada</Text>
        <SmallText>
          {rates && `${humanizeCad(1)} = ${humanizeBrl(rates.BRL)}`}
        </SmallText>
        <Text>Brazil</Text>
      </SubTitle>
      <PercentBar percent={percent}>
        <Text>{humanizedTotal(cadTotal)}</Text>
        <Text>{humanizedTotal(brlTotal)}</Text>
      </PercentBar>
    </>
  )
}

export default BalanceGraph
