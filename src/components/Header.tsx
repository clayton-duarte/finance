import React, { FunctionComponent } from "react";
import { useSession, signOut } from "next-auth/client";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

import { styled } from "../providers/theme";

const StyledHeader = styled.header`
  background: ${(props) => props.theme.palette.PRIMARY};
  box-shadow: ${(props) => props.theme.shape.shadow};
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
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  const [firstName] = session.user?.name?.split(" ");

  return (
    <StyledHeader>
      <StyledTemplate>
        <FiHome role="button" onClick={() => router.push("/")} />
        <UserName>Hello {firstName}</UserName>
        {router?.route !== "/profile" ? (
          <FiUser role="button" onClick={() => router.push("/profile")} />
        ) : (
          <FiLogOut
            role="button"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        )}
      </StyledTemplate>
    </StyledHeader>
  );
};

export default Header;
