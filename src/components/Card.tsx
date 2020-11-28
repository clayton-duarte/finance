import { styled } from "../providers/theme";

export default styled.section<{ disabled?: boolean; columns?: string }>`
  grid-template-columns: ${(props) => props.columns || "auto"};
  border-radius: ${(props) => props.theme.shape.radius};
  box-shadow: ${(props) => props.theme.shape.shadow};
  background: ${(props) => props.theme.palette.BG};
  color: ${(props) => props.theme.palette.PRIMARY};
  display: grid;
  padding: 1rem;
  margin: 0;
  gap: 1rem;
  > svg {
    color: ${(props) => props.theme.palette.SECONDARY};
    align-self: center;
    font-size: 1.5rem;
  }
  ${(props) =>
    props.disabled &&
    `
    filter: grayscale(100%);
    pointer-events: none;
  `}
`;
