import React from "react"
import Modal from "react-modal"
import Alert from 'react-s-alert';

import RecipeForm from "./RecipeForm"
import Button from "./common/Button"

Modal.setAppElement("#root")

class AddRecipeModal extends React.Component {

  addIngredient = () => {
    let ingredients = this.state.ingredients.concat("")
    this.setState({
      ingredients: ingredients
    })
  }

  handleClose = () => {
    this.setState({
      ingredients: []
    })
    this.props.closeModal();
  }

  handleSubmit = (values, actions) => {
    // TODO: Include CSRF token when the authentication is required
    fetch("/recipes/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    .then(
      (response) => response.json()
    )
    .then(
      (data) => {
        Alert.success("Recipe added Successfully!")
        this.props.refreshList(data)
        actions.setSubmitting(false);
        this.handleClose()
      }
    )
  }

  render() {

    return(
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.handleClose}
        contentLabel="Add Recipe"
        shouldCloseOnOverlayClick={true}
      >
        <div className="modal-wrapper">
          <h2> Add a new recipe! </h2>
          <RecipeForm
            name={""}
            description={""}
            ingredients={[]}
            handleSubmit={this.handleSubmit}
            editMode={true}
          />
          <Button type="button" onClick={this.handleClose}> Close </Button>
        </div>
      </Modal>
    )
  }
}

export default AddRecipeModal
