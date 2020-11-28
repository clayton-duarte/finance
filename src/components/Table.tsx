import { styled } from "../providers/theme";
import { rgba } from "polished";

export default styled.table`
  border-radius: ${(props) => props.theme.shape.radius};
  box-shadow: ${(props) => props.theme.shape.shadow};
  background: ${(props) => props.theme.palette.BG};
  border-collapse: collapse;
  overflow: hidden;
  width: 100%;

  thead td {
    background: ${(props) => props.theme.palette.SECONDARY};
    color: ${(props) => props.theme.palette.BG};
  }

  tr:nth-child(even) {
    background: ${(props) => rgba(props.theme.palette.SECONDARY, 0.1)};
  }

  tr:nth-child(odd) {
    background: ${(props) => rgba(props.theme.palette.SECONDARY, 0.01)};
  }

  td {
    color: ${(props) => props.theme.palette.TEXT};
    text-transform: capitalize;
    padding: 0.5rem 0.75rem;
    width: 50%;
  }

  td:not(:first-child) {
    text-align: right;
  }
`;
