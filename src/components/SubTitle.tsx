import { styled } from "../providers/theme";

export default styled.h3`
  border-bottom: 2px solid ${(props) => props.theme.palette.SECONDARY};
  color: ${(props) => props.theme.palette.PRIMARY};
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  text-transform: uppercase;
  padding: 0 0 0.5rem 0;
  align-items: center;
  font-size: 1.1rem;
  display: grid;
  margin: 0;
  gap: 1rem;
`;
