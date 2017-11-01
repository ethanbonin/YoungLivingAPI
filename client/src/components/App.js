import createHistory from "history/createBrowserHistory";
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

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
    this.requireAuth = this.requireAuth.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser();
    this.requireAuth();
  }
  checkIfLoggedIn() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  requireAuth(nextState, Replace) {
    if (!this.props.auth) {
      this.setState({ isLoggedIn: false });
    } else {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Switch>

          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path={`/dashboard/prospects`} component={Prospects} />
          <Route
            exact
            path={`/dashboard/prospects/new`}
            component={ProspectsNew}
          />
          <Route component={NoMatch}/>
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
