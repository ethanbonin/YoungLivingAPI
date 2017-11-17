import createHistory from "history/createBrowserHistory";
import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./dashboard/Landing";
import DashBoard from "./dashboard/Dashboard";
import Prospects from "./prospects/Prospects";
import ProspectsNew from "./prospects/Form/ProspectsForm";
import Communicator from './communicator/Communicator';
import TextCommunicator from './communicator/TextCommunicator/TextCommunicator';
import EmailCommunicator from './communicator/EmailCommunicator/EmailCommunicator';

import EULA from './EULA';

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

    if (history.location.pathname === "/EULA"){
      history.push('/EULA');
    } else if (history.location.pathname !== "/" && !this.props.auth){
      history.push("/");
    }

    if (history.location.pathname === "/" && this.props.auth){
      console.log("redirecting to dash");
      history.push("/dashboard");
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          {this.redirectIfNotLoggedIn()}
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={DashBoard}/>
            <Route exact path={`/dashboard/prospects`} component={Prospects} />
            <Route
              exact
              path={`/dashboard/prospects/new`}
              component={ProspectsNew}
            />
            <Route exact path={`/dashboard/communicator`} component={Communicator} />
            <Route exact path={`/dashboard/textcommunicator`} component={TextCommunicator} />
            <Route exact path={`/dashboard/emailcommunicator`} component={EmailCommunicator} />
          <Route exact path={`/EULA`} component={EULA} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

/* <Message negative>
  <Message.Header>
    PERFORMING MAINTENANCE
  </Message.Header>
  <p>You might not be able to log in or perform some of the functions</p>
</Message> */

export default connect(mapStateToProps, actions)(App);
