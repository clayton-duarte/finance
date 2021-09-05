import { styled } from '../providers/theme'

export default styled.label`
  font-family: ${(props) => props.theme.fontFamily.bold};
  color: ${(props) => props.theme.palette.TEXT};
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1rem;
`
