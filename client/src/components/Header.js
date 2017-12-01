import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";
import * as actions from "../actions";
import axios from "axios";
import "./maincss/header.css";

import Login from "./Login";

const options = [
  { key: 1, text: "Dashboard", value: "/dashboard" },
  { key: 2, text: "Communicator", value: "/dashboard/communicator" },
  { key: 3, text: "Prospects", value: "/dashboard/prospects" }
];

class Header extends Component {
  constructor(props) {
    super();
    this.state = { showCard: false, goBack: false, goToPage: false, page: "" };
    this.renderContent = this.renderContent.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleGoToPage = this.handleGoToPage.bind(this);
  }

  handleLogout() {
    axios
      .get("/v0/yl/logout")
      .then(body => {
        this.props.fetchUser();
      })
      .catch(err => {
        console.log("There was an error logging out", err);
      });
  }

  handleGoToPage(e, { value }) {
    this.setState({ page: value, goToPage: true });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a
              onClick={() => this.setState({ showCard: !this.state.showCard })}
            >
              Login
            </a>
          </li>
        );
      default:
        return [
          <li key="3">
            <Dropdown
              text={this.props.header}
              value={this.props.header}
              options={options}
              className="dropdown_menu"
              onChange={this.handleGoToPage}
            />
          </li>,
          <li key="2">
            <Button
              as={Link}
              to={"/account"}
              color="black"
              className="welcomeText"
            >
              Account Page
            </Button>
          </li>,
          <li key="1">
            <Button onClick={this.handleLogout}>Logout</Button>
          </li>
        ];
    }
  }

  headerBar() {
    return (
      <nav>
        <div className="nav-wrapper teal">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="headerLogo left brand-logo"
          >
            Essential Assistant
          </Link>
          <ul className="right" style={{ marginRight: "1em" }}>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <div>
        {this.headerBar()}
        {this.state.goToPage ? <Redirect push to={this.state.page} /> : null}
        {this.state.goBack ? <Redirect push to="/" /> : null}
        {this.state.showCard ? <Login removeCard={this.removeCard} /> : null}
      </div>
    );
  }

  removeCard(value) {
    this.setState({ showCard: false });
    this.props.checkIfLoggedIn();
  }
}

function mapStateToProps({ auth, header }) {
  return { auth, header };
}

export default connect(mapStateToProps, actions)(Header);
