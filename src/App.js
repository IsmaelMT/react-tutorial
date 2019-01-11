import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withCookies } from 'react-cookie';
import Alert from 'react-s-alert';

import Home from "./components/Home"
import RecipeList from "./components/RecipeList"
import RecipeDetail from "./components/RecipeDetail"

import "./App.css";
import 'react-s-alert/dist/s-alert-default.css';

class App extends Component {
  render() {
    return (
      <div className="Router">
        <Route exact path="/" component={ Home }/>
        <Route exact path="/recipes"
          render= { () => <RecipeList cookies={this.props.cookies} />} />
        <Route exact path="/recipes/detail/:id" component={ RecipeDetail }/>
        <Alert stack={{limit: 3}} />
      </div>
    )
  }
}

export default withCookies(App)
