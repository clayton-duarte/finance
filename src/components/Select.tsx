import React, { useRef, useState, FunctionComponent, Dispatch } from 'react'
import { rgba } from 'polished'

import { styled } from '../providers/theme'

const StyledWrapper = styled.a`
  border: ${(props) => props.theme.shape.border};
  border-color: ${(props) => props.theme.palette.SECONDARY};
  border-radius: ${(props) => props.theme.shape.radius};
  background: ${(props) => props.theme.palette.BG};
  color: ${(props) => props.theme.palette.TEXT};
  justify-content: center;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  position: relative;
  min-width: 3.5rem;
  display: grid;
  &:focus,
  &:active {
    color: ${(props) => props.theme.palette.TEXT};
    outline: none;
  }
`

const StyledPopOver = styled.aside<{ offset: number; open: boolean }>`
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
  border-radius: ${(props) => props.theme.shape.radius};
  top: ${(props) => (props.open ? props.offset : 0)}px;
  background: ${(props) => props.theme.palette.BG};
  opacity: ${(props) => (props.open ? 1 : 0)};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  transition: 0.3s ease;
  padding: 0.125rem 0;
  position: absolute;
  overflow: hidden;
  display: grid;
  z-index: 99;
  right: 0;
  left: 0;
`

const StyledLabel = styled.label`
  justify-content: center;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  display: grid;
  &:hover {
    background: ${(props) => rgba(props.theme.palette.PRIMARY, 0.2)};
  }
`

interface SelectProps {
  onChange: Dispatch<string>
  currentValue: string
  options: string[]
}

const Select: FunctionComponent<SelectProps> = ({
  currentValue,
  onChange,
  options,
}) => {
  const wrapperRef = useRef<HTMLAnchorElement>()
  const [open, setOpen] = useState<boolean>()

  const getHeight = () => {
    return wrapperRef.current?.getClientRects()[0]?.height
  }

  const handleBlur = (e) => {
    e.preventDefault()
    setOpen(false)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setOpen(!open)
  }

  const handleSelect = (index) => () => {
    onChange(options[index])
  }

  return (
    <StyledWrapper
      onClick={handleClick}
      onBlur={handleBlur}
      ref={wrapperRef}
      href="#"
    >
      {currentValue}
      <StyledPopOver offset={getHeight()} open={open}>
        {options.map((opt, index) => {
          if (opt !== currentValue)
            return (
              <StyledLabel onClick={handleSelect(index)} key={opt}>
                {opt}
              </StyledLabel>
            )
        })}
      </StyledPopOver>
    </StyledWrapper>
  )
}

export default Select
