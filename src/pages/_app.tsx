import React, { FunctionComponent, useEffect } from 'react'
import { Provider as AuthProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import Error from 'next/error'

import ThemeProvider, { GlobalStyle } from '../providers/theme'
import CurrencyProvider from '../providers/currency'
import AccountsProvider from '../providers/accounts'
import ProfileProvider from '../providers/profile'
import RatesProvider from '../providers/rates'
import { PageProps, SuccessProps } from '../libs/withSSP'

interface SSRAppProps extends AppProps<SuccessProps> {
  pageProps: PageProps
}

const MyApp: FunctionComponent<SSRAppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  useEffect(() => {
    // CLEAN AS PATH
    if (router.asPath.includes('#')) {
      const newPath = router.asPath.replace('#', '')
      router.replace(router.route, newPath)
    }
  }, [router, router.asPath])

  if (pageProps.success === false) {
    console.log(pageProps)
    return <Error {...pageProps.error} />
  }

  return (
    <AuthProvider session={pageProps.session}>
      <CurrencyProvider>
        <ThemeProvider>
          <RatesProvider>
            <ProfileProvider>
              <AccountsProvider>
                <Component {...pageProps} key={router.route} />
              </AccountsProvider>
            </ProfileProvider>
          </RatesProvider>
          <GlobalStyle />
        </ThemeProvider>
      </CurrencyProvider>
    </AuthProvider>
  )
}

export default MyApp
