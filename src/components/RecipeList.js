import React from "react"
import Alert from 'react-s-alert';
import {Link} from "react-router-dom"

import AddRecipeModal from "./AddRecipeModal"
import Loading from "./common/Loading"
import Button from "./common/Button"
import Card from "./common/Card"
import StyledLink from "./common/StyledLink"

class RecipeList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      loading: true,
      showAddRecipeModal: false
    };
  }

  async componentDidMount() {
    const recipes = await fetch("/recipes/", { credentials: "include" })
      .then(response => response.json())

    this.setState({ recipes, loading: false })
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

    let confirmDeletion = window.confirm(
      "Are you sure you want to remove this recipe?"
    )

    if (confirmDeletion) {
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
            Alert.success("Recipe removed successfully!")
          }
        }
      )
    }
  }

  render() {

    if (this.state.loading) {
      return <Loading />
    }

    const recipeList = this.state.recipes.map((recipe) => {
      return (
        <li key={ recipe.id } className="recipe-card">
          <Card>
            <div className="recipe-name">
              <Link to={`recipes/detail/${recipe.id}`} className="title"> { recipe.name } </Link>
            </div>
            <div className="recipe-description">
              { recipe.description ? `${recipe.description}`: ""}
            </div>
            <div className="remove-btn">
              <StyledLink onClick={ () => this.removeRecipe(recipe.id) }> remove </StyledLink>
            </div>
          </Card>
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
        <div className="recipe-title">
          <h1 className="main"> Your recipes </h1>
        </div>
        <section className="recipe-list">
          <ul>
            { recipeList }
          </ul>
          <div className="add-recipe-wrapper">
            <Button onClick={this.openAddRecipeModal} primary> Add Recipe </Button>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default RecipeList
