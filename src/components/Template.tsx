import { FunctionComponent } from "react";

import { styled } from "../providers/theme";
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = styled.main`
  grid-template-rows: auto 1fr auto;
  display: grid;
  height: 100%;
  gap: 1rem;
  grid-template-areas:
    "header"
    "content"
    "footer";
  > header {
    grid-area: header;
  }
  > article {
    grid-area: content;
  }
  > footer {
    grid-area: footer;
  }
`;

const Content = styled.article`
  grid-template-columns: 1fr;
  align-content: center;
  max-width: 1024px;
  padding: 0 1rem;
  margin: 0 auto;
  display: grid;
  width: 100%;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Template: FunctionComponent<{
  footerActions?: JSX.Element[];
}> = ({ children, footerActions = [] }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer actions={footerActions} />
    </Wrapper>
  );
};

export default Template;
