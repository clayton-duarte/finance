import React, { FunctionComponent, useEffect } from 'react'
import { Provider as AuthProvider } from 'next-auth/client'

import { AppProps } from 'next/app'

import ThemeProvider, { GlobalStyle } from '../providers/theme'
import CurrencyProvider from '../providers/currency'
import AccountsProvider from '../providers/accounts'
import ProfileProvider from '../providers/profile'
import RatesProvider from '../providers/rates'

const MyApp: FunctionComponent<AppProps> = ({
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
