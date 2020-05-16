import { styled } from "../providers/theme";

export default styled.input`
  font-family: ${(props) => props.theme.fontFamily.regular};
  border: 2px solid ${(props) => props.theme.palette.SECONDARY};
  border-radius: ${(props) => props.theme.shape.radius};
  color: ${(props) => props.theme.palette.TEXT};
  padding: 0.25rem 1rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;
