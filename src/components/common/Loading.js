import React from "react"
import styled from 'styled-components'
import "../../vars.css"

import Content from "./Content"

const StyledLoading = styled.div`
  font-size: 2em;
  font-weight: bold;
  color: var(--sky-blue);
`

const Loading = () => {
  return (
    <Content loading>
      <StyledLoading> Loading... </StyledLoading>
    </Content>
  )
}

export default Loading
