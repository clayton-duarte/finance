import React, { FunctionComponent } from "react";
import { Provider as AuthProvider } from "next-auth/client";

import { AppProps } from "next/app";

import ThemeProvider, { GlobalStyle } from "../providers/theme";
import CurrencyProvider from "../providers/currency";
import AccountsProvider from "../providers/accounts";
import RatesProvider from "../providers/rates";

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  return (
    <AuthProvider session={pageProps.session}>
      <CurrencyProvider>
        <ThemeProvider>
          <RatesProvider>
            <AccountsProvider>
              <Component {...pageProps} key={router.route} />
            </AccountsProvider>
          </RatesProvider>
          <GlobalStyle />
        </ThemeProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
};

export default MyApp;
