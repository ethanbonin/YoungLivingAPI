import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./dashboard/Dashboard";

//container adds borders on the side
class App extends Component {
  constructor(props) {
    super();
    this.state = { isLoggedIn: false };
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  checkIfLoggedIn() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route>
            <div>
              <Header checkIfLoggedIn={this.checkIfLoggedIn} loggedIn={this.state.isLoggedIn} />
            {this.state.isLoggedIn ? <Dashboard /> : <Landing />}
            </div>
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}


export default connect(null, actions)(App);
