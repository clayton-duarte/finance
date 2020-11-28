import React, {
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import LoadingPage from "../components/LoadingPage";
import { useProfile } from "../providers/profile";
import Template from "../components/Template";
import Input from "../components/Input";
import Title from "../components/Title";
import Label from "../components/Label";
import Grid from "../components/Grid";
import Card from "../components/Card";
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

  if (loading || !session) return <LoadingPage />;

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
      footerActions={[
        <FiArrowLeft key="back" role="button" onClick={handleClickBack} />,
        <FiCheck key="submit" role="button" onClick={handleSubmit} />,
      ]}
    >
      <Card>
        <Title>Edit Profile</Title>
        <Grid gap=".25rem">
          <Label>name</Label>
          <Input
            onChange={handleChangeData}
            value={session?.user?.name}
            name="name"
            disabled
            readOnly
          />
        </Grid>
        <Grid gap=".25rem">
          <Label>email</Label>
          <Input
            onChange={handleChangeData}
            value={session?.user?.email}
            name="email"
            disabled
            readOnly
          />
        </Grid>
        <Grid gap=".25rem">
          <Label>share accounts with</Label>
          <Input
            onChange={handleChangeData}
            value={formData?.share}
            name="share"
            type="email"
          />
        </Grid>
      </Card>
    </Template>
  );
};

export default TablesPage;
