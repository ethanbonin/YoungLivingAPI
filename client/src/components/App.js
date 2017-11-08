import createHistory from "history/createBrowserHistory";
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import { Message } from "semantic-ui-react";

import Header from "./Header";
import Landing from "./dashboard/Landing";
import DashBoard from "./dashboard/Dashboard";
import Prospects from "./prospects/Prospects";
import ProspectsNew from "./prospects/ProspectsForm";
import NoMatch from "./NoMatch";

const history = createHistory();

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

  redirectIfNotLoggedIn() {
    if (history.location.pathname !== "/" && !this.props.auth) {
      history.push("/");
    }

    if (history.location.pathname === "/" && this.props.auth) {
      history.push("/dashboard");
    }
  }

  render() {
    console.log("HELL0 WORLD");
    return (
      <Router history={history}>
        <div>
          <Message negative>
            <Message.Header>
              PERFORMING MAINTENANCE
            </Message.Header>
            <p>You might not be able to log in</p>
          </Message>
          <Header />
          {this.redirectIfNotLoggedIn()}
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path={`/dashboard/prospects`} component={Prospects} />
            <Route
              exact
              path={`/dashboard/prospects/new`}
              component={ProspectsNew}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
