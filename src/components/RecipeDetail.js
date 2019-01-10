import React from "react"
import uuid from 'uuid'

import Loading from "./Loading"

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      recipe: null
    }
  }

  async componentDidMount() {
    await fetch(`/recipes/${this.props.match.params.id}/`)
      .then(response => response.json())
      .then(result => this.setState({ loading: false,  recipe: result}))
  }

  render() {

    if (this.state.loading) {
      return <Loading />
    }
    else {

      return  (
        <React.Fragment>
          <div> Recipe: {this.state.recipe.name} </div>
          <div> Description: {this.state.recipe.description} </div>
          <ul>
            {
              this.state.recipe.ingredients.map((ing_name) => <li key={ uuid.v4() }> { ing_name } </li>)
            }
          </ul>

          <button onClick={ () => this.props.history.goBack() }> Go back </button>
        </React.Fragment>
      )
    }
  }


}

export default RecipeDetail
