import React from "react"
import Modal from "react-modal"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

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

  handleSubmit = (values, {isSubmitting}) => {
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
        this.props.refreshList(data)
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

          <Formik
            initialValues={{ name: "", description: "", ingredients: [] }}
            onSubmit={ (values, {isSubmitting}) => this.handleSubmit(values, {isSubmitting}) }
          >
            {
              ( {values, isSubmitting} ) => (
                <Form>
                  <div>
                    Name: <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div>
                    Description <Field type="text" name="description" />
                    <ErrorMessage name="description" component="div" />
                  </div>
                  <div>
                    <FieldArray name="ingredients" >
                      {({ push, insert, pop, form, remove }) => {
                        return (
                          <div>
                            {values.ingredients && values.ingredients.length > 0 ? (
                              <React.Fragment>
                                {
                                  values.ingredients.map((ingredient, idx) => {
                                    return (
                                      <div key={idx}>
                                        <Field type="text" name={ `ingredients.${idx}` } />
                                        <button type="button" onClick={() => remove(idx, "")}> - </button>
                                        <ErrorMessage name={ `ingredients.${idx}` } component="div" />
                                      </div>
                                    )
                                  })
                                }
                                <button type="button" onClick={() => push("")}> Add Another </button>
                              </React.Fragment>
                              )
                              : (
                                <button type="button" onClick={() => push("")}> Add Ingredients </button>
                              )
                            }
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                  <div>
                    <button type="button" onClick={this.handleClose}> Close </button>
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      </Modal>
    )
  }
}

export default AddRecipeModal
