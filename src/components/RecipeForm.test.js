import React from "react"
import { render } from "react-testing-library"

import RecipeForm from "./RecipeForm"


describe("<RecipeForm />", () => {
  
  const Recipe = {
    name: "Test recipe",
    description: "Recipe description",
    ingredients: ["ing1", "ing2"]
  }
 
  it("should render edit false", () => {

    const editMode = false

    const handleSubmit = (values, actions) => {}

    const { container, getByText } = render(
      <RecipeForm 
        name={Recipe.name}
        description={Recipe.description}
        ingredients={Recipe.ingredients}
        editMode={editMode}
        handleSubmit={handleSubmit}
      />
    )
    
    expect(getByText("Name:")).toBeInTheDocument()
    expect(getByText(Recipe.name)).toBeInTheDocument()
    expect(getByText("Description:")).toBeInTheDocument()
    expect(getByText(Recipe.description)).toBeInTheDocument()
    expect(getByText("Ingredients")).toBeInTheDocument()
    expect(getByText(Recipe.ingredients[0])).toBeInTheDocument()
    expect(getByText(Recipe.ingredients[1])).toBeInTheDocument()
  })

  it("should render edit true", () => {

    const editMode = true

    const handleSubmit = (values, actions) => {}

    const { container, getByText } = render(
      <RecipeForm 
        name={Recipe.name}
        description={Recipe.description}
        ingredients={Recipe.ingredients}
        editMode={editMode}
        handleSubmit={handleSubmit}
      />
    )
    
    expect(getByText("Name:")).toBeInTheDocument
    expect(getByText("Description:")).toBeInTheDocument
    expect(getByText("Ingredients")).toBeInTheDocument
    
    const form = container.querySelector("#recipe-form")

    expect(form).toHaveFormValues({
      "name": Recipe.name,
      "description": Recipe.description,
      "ingredients.0": Recipe.ingredients[0],
      "ingredients.1": Recipe.ingredients[1]
    })
  })

})

