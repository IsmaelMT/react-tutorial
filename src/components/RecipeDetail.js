import React from "react"
import Alert from 'react-s-alert';

import RecipeForm from "./RecipeForm"
import Loading from "./Loading"

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      recipe: null,
      editMode: false,
    }
  }

  async componentDidMount() {
    await fetch(`/recipes/${this.props.match.params.id}/`)
      .then(response => response.json())
      .then(result => this.setState({ loading: false,  recipe: result}))
  }

  toggleEditMode = () => {
    const editMode = this.state.editMode
    this.setState({
      editMode: !editMode
    })
  }

  handleSubmit = (values, actions) => {
    fetch(`/recipes/${this.props.match.params.id}/`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    })
    .then(
      (response) => response.json()
    )
    .then(
      (data) => {
        Alert.success("Recipe edited successfully!")
        actions.setSubmitting(false);
        this.setState({ editMode: false })
      }
    )
  }

  render() {

    if (this.state.loading) {
      return <Loading />
    }
    else {

      return  (
        <React.Fragment>
          <button onClick={ this.toggleEditMode }> {this.state.editMode ? "Cancel edit": "Edit"} </button>
          <RecipeForm
            name={this.state.recipe.name}
            description={this.state.recipe.description}
            ingredients={this.state.recipe.ingredients}
            editMode={this.state.editMode}
            handleSubmit={this.handleSubmit}
          />

          <button onClick={ () => this.props.history.goBack() }> Go back </button>
        </React.Fragment>
      )
    }
  }
}

export default RecipeDetail
