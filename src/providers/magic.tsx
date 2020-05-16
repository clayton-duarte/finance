import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { useRouter, NextRouter } from "next/router";
import { Magic } from "magic-sdk";

import LoadingPage from "../components/LoadingPage";
import LoginPage from "../components/LoginPage";
import { User } from "../types/interfaces";

interface MagicContextType {
  setLoading: Dispatch<boolean>;
  setToken: Dispatch<string>;
  setUser: Dispatch<User>;
  router: NextRouter;
  loading: boolean;
  token: string;
  magic: Magic;
  user: User;
}

const MagicContext = createContext<MagicContextType>(null);

const useMagic = () => {
  // Setup
  const {
    setLoading,
    setToken,
    setUser,
    loading,
    router,
    token,
    magic,
    user,
  } = useContext(MagicContext);
  magic.preload;

  // Methods
  const getUser = async () => {
    setLoading(true);

    try {
      const currentUser = await magic.user.getMetadata();
      setUser(currentUser);
    } catch {
      // TODO > Handle errors
    }

    setLoading(false);
  };

  const login = async (email: string) => {
    try {
      const idToken = await magic.auth.loginWithMagicLink({
        email,
      });
      setToken(idToken);
      getUser();
    } catch {
      // TODO > Handle errors
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await magic.user.logout();
      setLoading(true);
      setToken(null);
      setUser(null);
    } catch {
      // TODO > Handle errors
    }

    setLoading(false);
  };

  return { user, getUser, token, login, logout, setLoading };
};

const Provider: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>(null);
  const [magic, setMagic] = useState<Magic>(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!magic) {
      setMagic(new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY));
    }
  }, [magic]);

  const getToken = async () => {
    setLoading(true);

    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const idToken = await magic.user.getIdToken();
        if (idToken) {
          setToken(idToken);
        }
      }
    } catch (err) {
      // TODO > Handle errors
    }

    setLoading(false);
  };

  useEffect(() => {
    if (magic && !token) getToken();
  }, [magic, token]);

  const renderContent = () => {
    if (typeof window === "undefined") return null;
    if (loading) return <LoadingPage />;
    if (token) return children;
    return <LoginPage />;
  };

  return (
    <MagicContext.Provider
      value={{
        setLoading,
        setToken,
        loading,
        setUser,
        router,
        token,
        magic,
        user,
      }}
    >
      {renderContent()}
    </MagicContext.Provider>
  );
};

export default Provider;
export { useMagic };
