import { styled } from '../providers/theme'

export default styled.h1`
  border-bottom: 2px solid ${(props) => props.theme.palette.SECONDARY};
  color: ${(props) => props.theme.palette.PRIMARY};
  grid-template-columns: auto;
  text-transform: uppercase;
  justify-content: center;
  padding: 0 0 0.5rem 0;
  align-items: center;
  text-align: center;
  font-size: 1.2rem;
  display: grid;
  margin: 0;
  gap: 1rem;
  @media (min-width: 768px) {
    border-right: 2px solid ${(props) => props.theme.palette.SECONDARY};
    border-bottom: none;
    font-size: 2rem;
  }
`
