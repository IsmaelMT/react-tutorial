import React from "react"

import Modal from "react-modal"
import { render, wait } from "react-testing-library"
import { BrowserRouter as Router } from "react-router-dom";

import RecipeList from "./RecipeList"


describe("<RecipeList />", () => {
  const TestRecipes = [
    {
      id: 1,
      name: "Test recipe",
      description: "Recipe description",
      ingredients: ["ing1", "ing2"]
    },
    {
      id: 2,
      name: "Test recipe2",
      description: "Recipe description2",
      ingredients: ["ing1"]
    }
  ]

  it("shows the recipe list", async () => {
    mockFetchOnce(TestRecipes)

    const {container, getByText} = render(
      <Router>
        <RecipeList />
      </Router>
    )
        
    await wait(
      () => expect(document.getElementsByClassName("recipe-card").length).toBe(2)
    )
  })

})
