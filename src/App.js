import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withCookies } from 'react-cookie';
import Alert from 'react-s-alert';

import Home from "./components/Home"
import RecipeList from "./components/RecipeList"
import RecipeDetail from "./components/RecipeDetail"
import MainContainer from "./components/common/MainContainer"

import "./App.css";
import 'react-s-alert/dist/s-alert-default.css';

class App extends Component {
  render() {
    return (
      <MainContainer>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/recipes"
          render= { () => <RecipeList cookies={this.props.cookies} />} />
        <Route exact path="/recipes/detail/:id" component={ RecipeDetail }/>
        <Alert stack={{limit: 3}} />
      </MainContainer>
    )
  }
}

export default withCookies(App)
