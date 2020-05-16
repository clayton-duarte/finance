import React, { FunctionComponent, useEffect } from "react";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

import { useRates } from "../providers/rates";
import { useMagic } from "../providers/magic";
import { styled } from "../providers/theme";

const StyledHeader = styled.header`
  background: ${(props) => props.theme.palette.PRIMARY};
  color: ${(props) => props.theme.palette.BG};
  position: sticky;
  font-size: 2rem;
  display: grid;
`;

const StyledTemplate = styled.section`
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
  display: grid;
  padding: 1rem;
  width: 100%;
`;

const UserEmail = styled.span`
  font-size: 1rem;
`;

const Header: FunctionComponent = () => {
  const { logout, user, getUser } = useMagic();
  const { rates } = useRates();
  const router = useRouter();

  useEffect(() => {
    if (!user) getUser();
  }, [user]);

  if (!rates) return null;

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickExit = () => {
    logout();
  };

  return (
    <>
      <StyledHeader>
        <StyledTemplate>
          <FiHome role="button" onClick={handleClickHome} />
          <UserEmail>{user?.email}</UserEmail>
          <FiLogOut role="button" onClick={handleClickExit} />
        </StyledTemplate>
      </StyledHeader>
    </>
  );
};

export default Header;
