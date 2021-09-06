import React, { FunctionComponent } from 'react'

import { humanizeBrl, humanizeCad } from '../libs/format'
import { useCurrency } from '../providers/currency'
import { styled } from '../providers/theme'
import { useMath } from '../libs/math'
import { Account, Currencies, RatesResponse } from '../types'
import Title from './Title'

const StyledText = styled.p`
  color: ${(props) => props.theme.palette.PRIMARY};
  justify-content: space-around;
  font-weight: bolder;
  text-align: center;
  font-size: 2rem;
  display: grid;
  margin: 0;
`

const BigTotal: FunctionComponent<{
  rates: RatesResponse
  accounts: Account[]
}> = ({ rates, accounts }) => {
  const { currency } = useCurrency()

  const { totalInCad, totalInBrl } = useMath(accounts, rates)

  const calcBigTotal = () => {
    if (currency === Currencies.CAD) {
      return humanizeCad(totalInCad())
    }
    return humanizeBrl(totalInBrl())
  }

  return (
    <Title>
      balance total
      <br />
      <StyledText>{calcBigTotal()}</StyledText>
    </Title>
  )
}

export default BigTotal
