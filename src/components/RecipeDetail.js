import React from "react"
import Alert from 'react-s-alert';

import RecipeForm from "./RecipeForm"
import Loading from "./common/Loading"
import Content from "./common/Content"
import StyledLink from "./common/StyledLink"
import Card from "./common/Card"
import Button from "./common/Button"


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
        <Content className="detail-container" main>
          <div className="detail-wrapper">
            <Content className="detail-header" right>
              <Button onClick={ this.toggleEditMode } primary> 
                {this.state.editMode ? "Cancel edit": "Edit"} 
              </Button>
            </Content>
            <Card className="detail-body">
              <RecipeForm
                name={this.state.recipe.name}
                description={this.state.recipe.description}
                ingredients={this.state.recipe.ingredients}
                editMode={this.state.editMode}
                handleSubmit={this.handleSubmit}
              />
            </Card>
            <Content className="detail-footer" left>
              <StyledLink onClick={ () => this.props.history.goBack() }> 
                Go back 
              </StyledLink>
            </Content>
          </div>
        </Content>
      )
    }
  }
}

export default RecipeDetail
