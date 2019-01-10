import React from "react"
import {Link} from "react-router-dom"
import AddRecipeModal from "./AddRecipeModal"

class RecipeList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      showAddRecipeModal: false
    };
  }

  async componentDidMount() {
    const recipes = await fetch("/recipes/", { credentials: "include" })
      .then(response => response.json())

    this.setState({ recipes })
  }

  refreshList = (recipe) => {
    console.log(recipe)
    let recipes = this.state.recipes
    recipes = recipes.concat(recipe)
    this.setState( {recipes} )
  }

  openAddRecipeModal = () => {
    this.setState({
      showAddRecipeModal: true
    })
  }

  closeAddRecipeModal = () => {
    this.setState({
      showAddRecipeModal: false
    });
  }

  async removeRecipe (recipeId) {
    await fetch(`/recipes/${recipeId}/`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
    .then(
      (response) => {
        if (response.status === 204) {
          let recipes = this.state.recipes
          recipes = recipes.filter((recipe) => recipe.id !== recipeId)
          this.setState({ recipes })
        }
      }
    )
  }

  render() {

    const recipeList = this.state.recipes.map((recipe) => {
      return (
        <li key={ recipe.id }>
          <Link to={`recipes/detail/${recipe.id}`}> { recipe.name } </Link>
          { recipe.description ? `- ${recipe.description}`: ""}
          <button type="button" onClick={ () => this.removeRecipe(recipe.id) }> x </button>
        </li>
      )
    })

    return (
      <React.Fragment>
        <AddRecipeModal
          isOpen={this.state.showAddRecipeModal}
          closeModal={this.closeAddRecipeModal}
          cookies={this.props.cookies}
          refreshList={this.refreshList}
        />
        <ul>
          { recipeList }
        </ul>
        <button onClick={this.openAddRecipeModal}> Add Recipe </button>
      </React.Fragment>
    )
  }
}

export default RecipeList
