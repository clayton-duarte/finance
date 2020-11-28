import React, { FunctionComponent } from "react";
import { useSession, signOut } from "next-auth/client";
import { FiHome, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { useRouter } from "next/router";

import { styled } from "../providers/theme";

const StyledHeader = styled.header`
  background: ${(props) => props.theme.palette.PRIMARY};
  box-shadow: ${(props) => props.theme.shape.shadow};
  color: ${(props) => props.theme.palette.BG};
  position: sticky;
  font-size: 2rem;
  display: grid;
  top: 0;
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
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  const getWelcome = () => {
    const name = session?.user?.name;
    if (name) {
      const [firstName] = name.split(" ");
      return `Hello ${firstName}`;
    }
    return "Please Sign-in";
  };

  const renderLeftButton = () => {
    if (session) {
      return <FiHome onClick={() => router.push("/")} role="button" />;
    }
    return <span />;
  };

  const renderRightButton = () => {
    if (router?.route?.includes("profile")) {
      if (session) {
        return (
          <FiLogOut
            onClick={() => signOut({ callbackUrl: "/" })}
            role="button"
          />
        );
      }
      return null;
    }
    return <FiUser onClick={() => router.push("/profile")} role="button" />;
  };

  return (
    <StyledHeader>
      <StyledTemplate>
        {renderLeftButton()}
        <UserName>{getWelcome()}</UserName>
        {renderRightButton()}
      </StyledTemplate>
    </StyledHeader>
  );
};

export default Header;
