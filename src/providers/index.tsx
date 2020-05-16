import React from "react";

import ThemeProvider, { GlobalStyle } from "./theme";
import CurrencyProvider from "./currency";
import AccountsProvider from "./accounts";
import MagicProvider from "./magic";
import RatesProvider from "./rates";

const Providers = ({ children }) => {
  return (
    <CurrencyProvider>
      <ThemeProvider>
        <MagicProvider>
          <RatesProvider>
            <AccountsProvider>{children}</AccountsProvider>
          </RatesProvider>
        </MagicProvider>
        <GlobalStyle />
      </ThemeProvider>
    </CurrencyProvider>
  );
};

export default Providers;
