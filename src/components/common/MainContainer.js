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
    &.main {
      text-align: center;  
    }
  }

  ul {
    margin: auto auto 1em auto;
    padding: 0;
  }

  li {
    list-style-type: none;
    margin: 0 0 0.5em 1em;
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
  
  span.form-lbl {
    color: var(--sky-blue);
    font-weight: bold;
  }
  
  .form-divider, .detail-header {
    margin-top: 0.1em;
    margin-bottom: 1em;  
  }
  
  .recipe-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .add-recipe-wrapper {
    display: flex;
    justify-content: center;
  }

  .detail-wrapper {
    width: 50%;
    padding: 2em;    
  }

  input[type="text"] {
    max-width: 180px;
    border: 1px solid var(--lighter-gray);
    border-radius: 4px;
    margin: 0;
    padding: 1em;
    
    &.ingredient {
      margin: 0 0.5em 0.3em 0;  
    }
  }

  .form-error {
    color: var(--dark-red);
    margin: 0.1em 0.1em 0.3em 0.1em;
    font-weight: bold;
  }

`

export default MainContainer
