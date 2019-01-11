import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 4px;
  border: 1px solid;
  color: rgb(19, 150, 228);
  margin: 0 1em;
  padding: 1em 1em;
  font-weight: bold;
  cursor: pointer;

  ${
    props => props.primary &&
      css`
        background-color: var(--sky-blue);
        color: white;
        border: 1px solid white;
      `
  };
`

export default Button
