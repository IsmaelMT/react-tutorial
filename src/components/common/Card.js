import styled from 'styled-components'
import "../../vars.css"


const Card = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  margin: auto;
  padding: 1em;
  box-shadow: rgba(50, 50, 93, 0.06) 0px 4px 8px 0px,
              rgba(121, 135, 157, 0.1) 0px 0px 4px 0px,
              rgba(50, 50, 93, 0.06) 0px 2px 6px 0px;

  max-width: 600px;

  div {
    margin-bottom: 0.3em
  }

  .recipe-name {
    margin-bottom: 0.7em;
  }

  .recipe-description {
    padding-left: 1em;
    margin-bottom: 1em;
    font-size: 0.9em;
    color: var(--light-gray-text);
  }

  .remove-btn {
    margin-bottom: 0;
    text-align: right;
  }
`

export default Card
