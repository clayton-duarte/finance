import React, {
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { signOut, useSession } from "next-auth/client";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useRouter } from "next/router";

import LoadingPage from "../components/LoadingPage";
import { useProfile } from "../providers/profile";
import Template from "../components/Template";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import Label from "../components/Label";
import Grid from "../components/Grid";
import { Profile } from "../types";

const TablesPage: FunctionComponent = () => {
  const { profile, getProfile, updateProfile } = useProfile();
  const [formData, setFormData] = useState<Profile>(null);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  if (loading) return <LoadingPage />;

  const handleSubmit = () => {
    updateProfile(formData);
  };

  const handleClickBack = () => {
    router.push("/");
  };
  const handleChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Template
      footerChildren={
        <>
          <FiArrowLeft role="button" onClick={handleClickBack} />
          <span />
          <FiCheck role="button" onClick={handleSubmit} />
        </>
      }
    >
      <Title>Edit Profile</Title>
      <Grid>
        <Label>name</Label>
        <Input
          onChange={handleChangeData}
          value={session?.user?.name}
          name="name"
          disabled
          readOnly
        />
      </Grid>
      <Grid>
        <Label>email</Label>
        <Input
          onChange={handleChangeData}
          value={session?.user?.email}
          name="email"
          disabled
          readOnly
        />
      </Grid>
      <Grid>
        <Label>share accounts with</Label>
        <Input
          onChange={handleChangeData}
          value={formData?.share}
          name="share"
          type="email"
        />
      </Grid>
      <Button onClick={signOut}>logout</Button>
    </Template>
  );
};

export default TablesPage;
