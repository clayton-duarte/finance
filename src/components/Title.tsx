import { styled } from "../providers/theme";

export default styled.h1`
  border-bottom: 2px solid ${(props) => props.theme.palette.SECONDARY};
  color: ${(props) => props.theme.palette.PRIMARY};
  justify-content: space-around;
  grid-template-columns: auto;
  text-transform: uppercase;
  padding: 0 0 0.5rem 0;
  align-items: center;
  font-size: 1.2rem;
  grid-area: title;
  display: grid;
  margin: 0;
  gap: 1rem;
`;
