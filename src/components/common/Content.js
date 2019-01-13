import styled, { css } from "styled-components"
import "../../vars.css"


const ctnAlignRightStyles = css`
  justify-content: flex-end;
`

const ctnAlignLeftStyles = css`
  justify-content: flex-start;
`

const mainPropsStyles = css`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const loadingPropsStyles = css`
  ${mainPropsStyles}
  min-height: 100vh;
`

const Content = styled.section`
  display: flex;
  
  ${ props => props.right && ctnAlignRightStyles }
  ${ props => props.left && ctnAlignLeftStyles }
  ${ props => props.main && mainPropsStyles }
  ${ props => props.loading && loadingPropsStyles }
`

export default Content
