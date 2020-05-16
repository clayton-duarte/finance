import { styled } from "../providers/theme";

interface GridProps {
  area?: string;
  gap?: string;
  p?: string;
  m?: string;
}

export default styled.div<GridProps>`
  ${(props) => props.area && `grid-area: ${props.area}`};
  ${(props) => props.area && `grid-area: ${props.area}`};
  ${(props) => props.gap && `gap: ${props.gap}`};
  ${(props) => props.p && `padding: ${props.p}`};
  ${(props) => props.m && `margin: ${props.m}`};
  align-content: flex-start;
  display: grid;
`;
