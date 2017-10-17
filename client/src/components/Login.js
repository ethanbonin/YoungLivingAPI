import React, { Component } from "react";
import { Input, Card } from "semantic-ui-react";
import axios from "axios";
import * as actions from "../actions";
import { connect } from "react-redux";

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
      <div>
        <Input
          label={{ icon: "asterisk" }}
          labelPosition="left corner"
          placeholder="Username or Member ID"
          onChange={this.handleUserNameChange}
        />
        <br />
        <Input
          label={{ icon: "asterisk" }}
          labelPosition="left corner"
          placeholder="Password"
          type="password"
          onChange={this.handlePasswordChange}
        />
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          clear: "both",
          height: "0px"
        }}
      >
        <Card.Group>
          <Card style={{ "z-index": "1", height: "200px" }}>
            <div className="card-action center-align">
              {this.state.showWarning ? this.renderWarning() : null}
              {this.state.showError ? this.renderError() : null}
              {this.renderInputFields()}
            </div>
            <a
              className="btn waves-effect waves-light"
              name="action"
              onClick={this.login_status}
            >
              Sign In
            </a>
          </Card>
        </Card.Group>
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
        //Order of setting states matter!
        this.setState({ showLoading: false });
        this.props.fetchUser();
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
