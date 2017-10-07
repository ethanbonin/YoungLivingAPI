import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./dashboard/Landing";
import Dashboard from "./dashboard/Dashboard";
import Prospects from './prospects/Prospects';



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
        <div className="">
          <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path={`/prospects`} component={Prospects}/>
        </div>
      </BrowserRouter>
    );
  }
}

//
// <BrowserRouter>
//   <div className="container">
//     <Route>
//       <div>
//         <Header checkIfLoggedIn={this.checkIfLoggedIn} loggedIn={this.state.isLoggedIn} />
//       {this.state.isLoggedIn ? <Dashboard /> : <Landing />}
//       </div>
//     </Route>
//   </div>
// </BrowserRouter>

export default connect(null, actions)(App);
