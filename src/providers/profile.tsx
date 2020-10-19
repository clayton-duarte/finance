import { useRouter } from "next/router";
import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  Dispatch,
} from "react";

import { useAxios } from "../libs/axios";
import { Profile } from "../types";

const ProfileContext = createContext<{
  setProfile: Dispatch<Profile>;
  profile: Profile;
}>(null);

const useProfile = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { axios, errorHandler } = useAxios();
  const router = useRouter();

  const updateProfile = async (profile: Profile) => {
    try {
      const { data } = await axios.put<Profile>("/profile", { profile });
      setProfile(data);
      router.push("/");
    } catch (err) {
      errorHandler<Account>(err);
    }
  };

  return { profile, updateProfile };
};

const AccountsProvider: FunctionComponent = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default AccountsProvider;
export { useProfile };
