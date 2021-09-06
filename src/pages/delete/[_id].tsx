import React, { FunctionComponent, useEffect, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import axios from 'axios'

import LoadingPage from '../../components/LoadingPage'
import Template from '../../components/Template'
import { styled } from '../../providers/theme'
import { withSSP } from '../../libs/withSSP'
import Title from '../../components/Title'
import Grid from '../../components/Grid'
import { Account } from '../../types'

const StyledForm = styled.form``

const StyledText = styled.p`
  margin: 0;
`

const AccountName = styled(StyledText)`
  color: ${(props) => props.theme.palette.SECONDARY};
  text-transform: capitalize;
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
  const router = useRouter()

  const deleteAccount = async () => {
    try {
      await axios.delete<Account[]>('/api/accounts', {
        params: {
          _id: account._id,
        },
      })
      router.push('/edit')
    } catch (err) {
      console.log(err)
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
        <FiCheck onClick={deleteAccount} key="confirm" role="button" />,
      ]}
    >
      <Title>Delete account</Title>
      <Grid gap="1rem">
        <StyledForm>
          <Grid gap=".5rem">
            <StyledText>You are about to delete the account:</StyledText>
            <AccountName>{account.name}</AccountName>
            <StyledText>Are you sure?</StyledText>
          </Grid>
        </StyledForm>
      </Grid>
    </Template>
  )
}

export default TablesPage
