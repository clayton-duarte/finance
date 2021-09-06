import React, {
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from 'react'
import { FiArrowLeft, FiCheck, FiAlertTriangle } from 'react-icons/fi'
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import LoadingPage from '../components/LoadingPage'
import { useProfile } from '../providers/profile'
import Template from '../components/Template'
import { styled } from '../providers/theme'
import Button from '../components/Button'
import Input from '../components/Input'
import Title from '../components/Title'
import Label from '../components/Label'
import Grid from '../components/Grid'
import { Profile } from '../types'

const Text = styled.p`
  text-align: center;
  margin: 0;
`

const TablesPage: FunctionComponent = () => {
  const { profile, getProfile, updateProfile } = useProfile()
  const [formData, setFormData] = useState<Profile>(null)
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      setFormData(profile)
    }
  }, [profile])

  if (loading) return <LoadingPage />

  const handleSubmit = () => {
    updateProfile(formData)
  }

  const handleClickBack = () => {
    router.push('/')
  }
  const handleChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const renderContent = () => {
    if (session) {
      return (
        <>
          <Title>Edit Profile</Title>
          <Grid gap=".25rem">
            <Label>name</Label>
            <Input
              onChange={handleChangeData}
              value={session?.user?.name}
              name="name"
              disabled
              readOnly
            />
          </Grid>
          <Grid gap=".25rem">
            <Label>email</Label>
            <Input
              onChange={handleChangeData}
              value={session?.user?.email}
              name="email"
              disabled
              readOnly
            />
          </Grid>
          <Grid gap=".25rem">
            <Label>share accounts with</Label>
            <Input
              onChange={handleChangeData}
              value={formData?.share}
              name="share"
              type="email"
            />
          </Grid>
        </>
      )
    }

    return (
      <>
        <Title>
          <FiAlertTriangle fontSize="3rem" />
        </Title>
        <Text>
          To access this page, you need to sign-in. Please click at the icon at
          the top-right of this screen.
        </Text>
        <Button onClick={() => signIn('google')}>sign-in</Button>
      </>
    )
  }

  return (
    <Template
      footerActions={
        session && [
          <FiArrowLeft onClick={handleClickBack} role="button" key="back" />,
          <FiCheck key="submit" role="button" onClick={handleSubmit} />,
        ]
      }
    >
      <>{renderContent()}</>
    </Template>
  )
}

export default TablesPage
