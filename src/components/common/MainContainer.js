import styled from "styled-components"
import "../../vars.css"


const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  flex-direction: column;

  h1 {
    font-size: 2em;
    color: rgb(29, 44, 60);
    margin-bottom: 1em;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2em 1em 2em 0em;
    padding: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style-type: none;
    margin-bottom: 0.5em;
  }

  a {
    color: var(--sky-blue);

    &:link {
      text-decoration: none;
    }
    &:visited {
      text-decoration: none;
    }
    &:hover {
      text-decoration: none;
    }
    &:active {
      text-decoration: none;
    }
    &.title {
      font-weight: bold;
      text-transform: capitalize;
    }
  }

  .recipe-list, .recipe-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .recipe-title {
    text-align: center;
  }
`

export default MainContainer
