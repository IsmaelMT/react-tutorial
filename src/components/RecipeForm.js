import React from "react"
import uuid from "uuid"

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

class RecipeForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editMode: this.props.editMode
    }
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
      >
        {
          ( {values, isSubmitting} ) => (
            <Form>
              <div>
                Name: {
                  this.props.editMode ? (
                    <React.Fragment>
                      <Field type="text" name="name" />
                      <ErrorMessage name="name" component="div" />
                    </React.Fragment>
                  ):
                    ( values.name )
                }
              </div>
              <div>
                Description: {
                  this.props.editMode ? (
                    <React.Fragment>
                      <Field type="text" name="description" />
                      <ErrorMessage name="description" component="div" />
                    </React.Fragment>
                  ):
                    (values.description)
                }
              </div>
              <div>

                {this.props.editMode ? (
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
                  ) :
                  (
                    <ul>
                      {
                        values.ingredients.map((ing_name) => <li key={ uuid.v4() }> { ing_name } </li>)
                      }
                    </ul>
                  )
                }
              </div>
              {this.props.editMode && (
                <div>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
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
