import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  Dispatch,
  useEffect,
} from "react";
import Head from "next/head";

import { Currencies } from "../types/enums";
import { useCookies } from "../lib/cookies";

const CurrencyContext = createContext<{
  setCurrency: Dispatch<Currencies>;
  currency: Currencies;
}>(null);

const useCurrency = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);

  return { currency, setCurrency };
};

const CurrencyProvider: FunctionComponent = ({ children }) => {
  const { getCurrencyCookie, setCurrencyCookie } = useCookies();
  const initialValue = getCurrencyCookie();
  const [currency, setCurrency] = useState<Currencies>(
    initialValue || Currencies.CAD
  );

  useEffect(() => {
    setCurrencyCookie(currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <>
        <Head>
          <title>Finance - {currency}</title>
        </Head>
        {children}
      </>
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
export { useCurrency };
