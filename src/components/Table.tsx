import { styled } from "../providers/theme";

export default styled.table`
  border-radius: ${(props) => props.theme.shape.radius};
  border-collapse: collapse;
  overflow: hidden;
  width: 100%;

  thead tr {
    background: ${(props) => props.theme.palette.SECONDARY};
    color: ${(props) => props.theme.palette.BG};
  }

  td {
    border: 2px solid ${(props) => props.theme.palette.SECONDARY};
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    width: 50%;
  }

  td:not(:first-child) {
    text-align: right;
  }
`;
