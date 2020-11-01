import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  Dispatch,
} from "react";

import { useAxios } from "../libs/axios";
import { Account } from "../types";

const AccountsContext = createContext<{
  setAccounts: Dispatch<Account[]>;
  accounts: Account[];
}>(null);

const useAccounts = () => {
  const { accounts, setAccounts } = useContext(AccountsContext);
  const { axios, errorHandler } = useAxios();

  const getAccounts = async () => {
    try {
      const { data } = await axios.get<Account[]>("/accounts");
      setAccounts(data);
    } catch (err) {
      errorHandler<Account[]>(err);
    }
  };

  const postAccount = async (newAccount: Partial<Account>) => {
    if (newAccount.name && newAccount.name) {
      try {
        await axios.post<Account[]>("/accounts", {
          account: newAccount,
        });
        getAccounts();
      } catch (err) {
        errorHandler<Account[]>(err);
      }
    }
  };

  const deleteAccount = async (accountId: Account["_id"]) => {
    try {
      await axios.delete<Account[]>("/accounts", {
        params: {
          _id: accountId,
        },
      });
      getAccounts();
    } catch (err) {
      errorHandler<Account[]>(err);
    }
  };

  const updateAccount = async (updatedAccount: Account) => {
    if (updatedAccount.name && updatedAccount.name) {
      try {
        await axios.put<Account>("/accounts", { account: updatedAccount });
        getAccounts();
      } catch (err) {
        errorHandler<Account>(err);
      }
    }
  };

  return { accounts, deleteAccount, getAccounts, postAccount, updateAccount };
};

const AccountsProvider: FunctionComponent = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(null);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
export { useAccounts };
