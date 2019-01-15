import React from "react"
import uuid from "uuid"

import Button from "./common/Button"
import Content from "./common/Content"
import StyledLink from "./common/StyledLink"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

class RecipeForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editMode: this.props.editMode
    }
  }

  validateIngredient = (value) => {
    let error;
    if (value === "") {
      error = "The ingredient cannot be empty"
    }
    return error
  }
  
  validateName = (value) => {
    let error;
    if (value === "") {
      error = "The recipe name cannot be empty"
    }
    return error
  }

  render() {
    return (
      <Formik
        initialValues={
          {
            name: this.props.name,
            description: this.props.description,
            ingredients: this.props.ingredients
          }
        }
        onSubmit={ (values, actions) => this.props.handleSubmit(values, actions) }
        validate={ (values, props) => {
            let errors = {};
            if (values.ingredients.length === 0) {
              errors.ingredients = "The ingredients list cannot be empty"
            }
            return errors
          }
        }
      >
        {
          ( {values, isSubmitting} ) => (
            <Form id="recipe-form">
              <div className="form-divider">
                <span className="form-lbl"> Name: </span> {
                  this.props.editMode ? (
                    <React.Fragment>
                      <Field type="text" name="name" validate={this.validateName} />
                      <ErrorMessage name="name" component="div" className="form-error" />
                    </React.Fragment>
                  ):
                    ( values.name )
                }
              </div>
              <div className="form-divider">
                <span className="form-lbl"> Description: </span> {
                  this.props.editMode ? (
                    <React.Fragment>
                      <Field type="text" name="description" />
                      <ErrorMessage name="description" component="div" className="form-error"/>
                    </React.Fragment>
                  ):
                    (values.description)
                }
              </div>
              <div className="form-divider">
                {this.props.editMode ? (
                    <React.Fragment>
                      <ErrorMessage name="ingredients" component="div" className="form-error" />
                      <FieldArray name="ingredients">
                        {({ push, insert, pop, form, remove }) => {
                          return (
                            <div>
                              {values.ingredients && values.ingredients.length > 0 ? (
                                <React.Fragment>
                                  <div className="form-divider"><span className="form-lbl"> Ingredients </span></div>
                                  {
                                    values.ingredients.map((ingredient, idx) => {
                                      return (
                                        <div key={idx}>
                                          <Field type="text" 
                                              name={ `ingredients.${idx}` } 
                                              className="ingredient" 
                                              validate={this.validateIngredient}
                                          />
                                          <Button type="button" onClick={() => remove(idx, "")} > x </Button>
                                          <ErrorMessage name={ `ingredients.${idx}` }
                                                        component="div" 
                                                        className="form-error"
                                          />
                                        </div>
                                      )
                                    })
                                  }
                                  <Content left>
                                    <div className="form-divider">
                                      <StyledLink type="button" onClick={() => push("")} > Add Another </StyledLink>
                                    </div>
                                  </Content>
                                </React.Fragment>
                                )
                                : (
                                  <Content left>
                                    <div className="form-divider">
                                      <StyledLink type="button" onClick={() => push("")}> Add Ingredients </StyledLink>
                                    </div>
                                  </Content>
                                )
                              }
                            </div>
                          );
                        }}
                      </FieldArray>
                    </React.Fragment>
                  ) :
                  (
                    <React.Fragment>
                      <div className="form-divider"><span className="form-lbl"> Ingredients </span></div>
                      <ul>
                        {
                          values.ingredients.map((ing_name) => <li key={ uuid.v4() } > { ing_name } </li>)
                        }
                      </ul>
                    </React.Fragment>
                  )
                }
              </div>
              {this.props.editMode && (
                <div>
                  <Button type="submit" disabled={isSubmitting} primary>
                    Submit
                  </Button>
                </div>
              )}
            </Form>
          )
        }
      </Formik>
    )
  }
}

export default RecipeForm
