import React, { Component } from "react";
import axios from "axios";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Redirect } from 'react-router'


class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      showLoading: false,
      showWarning: false,
      showError: false,
      goBack: false
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login_status = this.login_status.bind(this);
    this.renderInputFields = this.renderInputFields.bind(this);
  }

  renderLoading() {
    return (
      <div>
        <div
          className="preloader-wrapper medium active"
          style={{ marginTop: "1em" }}
        >
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderError() {
    return (
      <div className="red-text" style={{ marginBottom: "20px" }}>
        WRONG USERNAME OR PASSWORD
      </div>
    );
  }

  renderWarning() {
    return (
      <div className="yellow-text" style={{ marginBottom: "20px" }}>
        YOU MUST FILL OUT ALL FIELDS
      </div>
    );
  }

  renderInputFields() {
    return (
      <div className="white-text" style={{ marginBottom: "15px" }}>
        <input
          id="username"
          type="text"
          className="center-align"
          onChange={this.handleUserNameChange}
        />
        <label className="center-align">Member ID or Username</label>
        <input
          id="password"
          type="password"
          className="center-align"
          onChange={this.handlePasswordChange}
        />
        <label className="center-align" style={{ marginBottom: "3em" }}>
          Password
        </label>
      </div>
    );
  }

  render() {
    return (
      <div className="container z-depth-5">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title center">Young Living Login</span>
          </div>
          <div className="card-action center-align">
            {this.state.showWarning ? this.renderWarning() : null}
            {this.state.showError ? this.renderError() : null}
            {this.renderInputFields()}
            <a
              className="btn waves-effect waves-light"
              name="action"
              onClick={this.login_status}
            >
              Sign In
            </a>
            {this.state.showLoading ? this.renderLoading() : null}
            {this.state.goBack ? <Redirect push to="/dashboard/"/> : null }
          </div>
        </div>
      </div>
    );
  }

  login_status() {
    var body = {
      userName: this.state.username,
      email: this.state.username,
      memberId: this.state.username,
      password: this.state.password
    };

    if (this.state.password === "" || this.state.username === "") {
      this.setState({ showWarning: true });
      return;
    }

    this.setState({ showLoading: true });
    axios
      .post("/v0/yl/login", body)
      .then(body => {
        this.setState({ showLoading: false });
        this.setState({ goBack: true });
        this.props.removeCard(false);
      })
      .catch(err => {
        this.setState({ showLoading: false });
        this.setState({ showWarning: false });
        this.setState({ showError: true });
      });
  }

  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
}

export default connect(null, actions)(Login);
