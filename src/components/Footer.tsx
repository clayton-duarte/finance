import React, { FunctionComponent } from "react";

import { styled } from "../providers/theme";

const StyledFooter = styled.footer`
  background: ${(props) => props.theme.palette.PRIMARY};
  color: ${(props) => props.theme.palette.BG};
  position: sticky;
  font-size: 2rem;
  display: grid;
`;

const StyledTemplate = styled.section`
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
  display: grid;
  padding: 1rem;
  width: 100%;
`;

const Footer: FunctionComponent = ({ children }) => {
  return (
    <StyledFooter>
      <StyledTemplate>{children}</StyledTemplate>
    </StyledFooter>
  );
};
export default Footer;
