import { styled, Palette } from "../providers/theme";

export default styled.button<{
  color?: keyof Palette;
}>`
  background: ${({ color, theme }) => theme.palette[color || "PRIMARY"]};
  font-family: ${(props) => props.theme.fontFamily.regular};
  border-radius: ${(props) => props.theme.shape.radius};
  border: ${(props) => props.theme.shape.border};
  color: ${(props) => props.theme.palette.BG};
  text-transform: uppercase;
  padding: 0.25rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  &:focus,
  &:hover,
  &:active {
    background: ${(props) => props.theme.palette.SECONDARY};
    outline: none;
  }
  &:disabled {
    filter: grayscale(100%);
  }
`;
