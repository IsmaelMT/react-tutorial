import React from "react"
import Modal from "react-modal"
import Alert from 'react-s-alert';

import RecipeForm from "./RecipeForm"
import StyledLink from "./common/StyledLink"
import Content from "./common/Content"
import MainContainer from "./common/MainContainer"


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
      (response) => {
        if (response.status === 201) {
          return response.json()
        }
        else {
          Alert.error(
            "An error ocurred: Check your form for errors"
          )
          actions.setSubmitting(false);
        }
      }
    )
    .then((data) => {
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
        className="recipe-modal"
      >
        <MainContainer>
          <Content className="detail-header" right>
            <StyledLink type="button" onClick={this.handleClose}> 
              x 
            </StyledLink>
          </Content>
          <Content className="modal-container" main>
            <div className="modal-wrapper">
              <h2> Add a new recipe! </h2>
              <RecipeForm
                name={""}
                description={""}
                ingredients={[]}
                handleSubmit={this.handleSubmit}
                editMode={true}
              />
            </div>
          </Content>
        </MainContainer>
      </Modal>
    )
  }
}

export default AddRecipeModal
