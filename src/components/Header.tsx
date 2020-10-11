import React, { FunctionComponent } from "react";
import { signOut, useSession } from "next-auth/client";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

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

const UserName = styled.span`
  text-transform: capitalize;
  font-size: 1rem;
`;

const Header: FunctionComponent = () => {
  const [session] = useSession();
  const router = useRouter();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickExit = () => {
    signOut();
  };

  return (
    <>
      <StyledHeader>
        <StyledTemplate>
          <FiHome role="button" onClick={handleClickHome} />
          <UserName>Hello {session?.user?.name}</UserName>
          <FiLogOut role="button" onClick={handleClickExit} />
        </StyledTemplate>
      </StyledHeader>
    </>
  );
};

export default Header;
