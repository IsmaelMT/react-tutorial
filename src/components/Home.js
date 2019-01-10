import React from "react";
import { Link } from "react-router-dom"


class Home extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <Link to="/recipes">React tutorial</Link>
          </h1>
        </header>
      </div>
    )
  }
}

export default Home
