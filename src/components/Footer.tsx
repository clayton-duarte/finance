import React, { FunctionComponent, ReactElement } from "react";

import { styled } from "../providers/theme";

const StyledFooter = styled.footer`
  background: ${(props) => props.theme.palette.PRIMARY};
  box-shadow: ${(props) => props.theme.shape.shadow};
  color: ${(props) => props.theme.palette.BG};
  position: sticky;
  font-size: 2rem;
  display: grid;
  bottom: 0;
`;

const StyledTemplate = styled.section<{ actions: number }>`
  grid-template-columns: repeat(${(props) => props.actions}, auto);
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
  display: grid;
  padding: 1rem;
  width: 100%;
`;

const Footer: FunctionComponent<{ actions: JSX.Element[] }> = ({ actions }) => {
  if (actions) {
    return (
      <StyledFooter>
        <StyledTemplate actions={actions.length}>
          <>{actions}</>
        </StyledTemplate>
      </StyledFooter>
    );
  }

  return null;
};

export default Footer;
