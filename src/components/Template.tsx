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
  grid-template-areas:
    "title"
    "rest";
  align-content: start;
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title title"
      "rest rest";
  }
`;

const Template: FunctionComponent<{
  footerChildren?: JSX.Element;
}> = ({ children, footerChildren }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer>{footerChildren}</Footer>
    </Wrapper>
  );
};

export default Template;
