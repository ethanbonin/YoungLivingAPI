import React, { Component } from "react";
import { Input, Card, Label, Dimmer, Transition } from "semantic-ui-react";
import axios from "axios";
import * as actions from "../actions";
import { connect } from "react-redux";
import "./maincss/header.css"

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
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
      <div className="red-text">
        WRONG USERNAME OR PASSWORD
      </div>
    );
  }

  renderWarning() {
    return (
      <div className="yellow-text">
        YOU MUST FILL OUT ALL FIELDS
      </div>
    );
  }

  renderInputFields() {
    return (
      <div className="inputboxes">
        <Input
          label={{ icon: "asterisk" }}
          labelPosition="left corner"
          placeholder="Username or Member ID"
          onChange={this.handleUserNameChange}
          className="inputbox"
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

  renderDimmer(){
    return (
      <Transition visible={this.state.dimmer} animation="fade" duration={500}>
        <Dimmer active={this.state.dimmer} size="medium">
          Saving
        </Dimmer>
      </Transition>
    )
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
          <Card className=" signinbox ">          
            <Label className="label_login">Use your Young Living Whole Sale account credentials. It would be the same if you were to login into Virtual Office</Label>
            <div className="inputboxes card-action center-align ">
              {this.state.showWarning ? this.renderWarning() : null}
              {this.state.showError ? this.renderError() : null}
                {this.renderInputFields()}
            </div>
            <a
              className="btn waves-effect waves-light signinbutton"
              name="action"
              onClick={() => this.login_status()}
            >
              <div className="signinbuttonlabeldiv">
                <Label className="signinbuttonlabel" size="massive" basic color='teal'>
                  Sign In
                </Label>
              </div>
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

    axios
      .post("/v0/yl/login", body)
      .then(body => {
        //Order of setting states matter!
        this.props.fetchUser();
        this.setState({ goBack: true });
        this.props.removeCard(false);
      })
      .catch(err => {
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
