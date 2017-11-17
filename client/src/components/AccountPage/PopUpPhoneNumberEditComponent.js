import React, { Component } from "react";
import { Popup, Input, Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./accountcss/account.css";

class PhoneEditPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: props.phoneNumber,
      error: false
    };
  }

  checkPhone(value) {
    const regex_number = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/;
    const result_number = regex_number.test(value);
    if (!result_number) {
      this.setState({ error: true });
      return false;
    }
    return true;
  }

  handleChange(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  handleSubmit() {
    if (this.checkPhone(this.state.phoneNumber)) {
      let timeZone = "";
      if (this.props.auth.user.user.timeZone !== undefined) {
        timeZone = this.props.auth.user.user.timeZone;
      }
      this.props.handleUpdate(this.state.phoneNumber, timeZone);
      this.props.updatePhoneNumer(this.state.phoneNumber, timeZone);
    }
  }

  renderErrorMessage() {
    return <Label color="red">Error - Incorrect format</Label>;
  }

  renderEdit = value => {
    return (
      <div style={{ textAlign: "-webkit-auto" }}>
        {this.state.error ? this.renderErrorMessage() : null}
        <Input value={value} onChange={e => this.handleChange(e)} />
        <Button
          color="blue"
          content="Save"
          style={{ marginTop: "1em", width: "100%" }}
          onClick={this.handleSubmit.bind(this)}
        />
      </div>
    );
  };

  render() {
    return (
      <Popup
        trigger={<Button color="grey" style={{ float: "right" }} icon="edit" />}
        content={this.renderEdit(this.state.phoneNumber)}
        on="click"
        position="bottom center"
      />
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(PhoneEditPopUp);
