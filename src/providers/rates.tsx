import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  Dispatch,
} from "react";

import { RatesResponse } from "../types";
import { useAxios } from "../lib/axios";

const RatesContext = createContext<{
  setRates: Dispatch<RatesResponse>;
  rates: RatesResponse;
}>(null);

const useRates = () => {
  const { rates, setRates } = useContext(RatesContext);
  const { axios, errorHandler } = useAxios();

  const getRates = async () => {
    if (!rates)
      try {
        const { data } = await axios.get<RatesResponse>("/rates");
        setRates(data);
      } catch (err) {
        errorHandler<RatesResponse>(err);
      }
  };

  return { rates, getRates };
};

const RatesProvider: FunctionComponent = ({ children }) => {
  const [rates, setRates] = useState<RatesResponse>(null);

  return (
    <RatesContext.Provider value={{ rates, setRates }}>
      {children}
    </RatesContext.Provider>
  );
};

export default RatesProvider;
export { useRates };
