import React from "react";
import { FiRefreshCw } from "react-icons/fi";

import { styled } from "../providers/theme";

const Wrapper = styled.div`
  justify-content: center;
  justify-items: center;
  align-content: center;
  display: grid;
  height: 100%;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  color: ${(props) => props.theme.palette.SECONDARY};
  font-size: 2rem;
  > svg {
    animation: rotate 2s linear infinite;
  }
`;

const Text = styled.p`
  color: ${(props) => props.theme.palette.PRIMARY};
  margin: 0;
`;

const LoadingPage = () => {
  const loadingPhrases = [
    "the best pancake ever",
    "almost there",
    "getting data",
    "please wait",
    "loading",
    "hold on",
    "batata",
  ];
  const randomIndex = Math.floor(Math.random() * loadingPhrases.length);

  return (
    <Wrapper>
      <IconWrapper>
        <FiRefreshCw />
      </IconWrapper>
      <Text>{loadingPhrases[randomIndex]}...</Text>
    </Wrapper>
  );
};

export default LoadingPage;
