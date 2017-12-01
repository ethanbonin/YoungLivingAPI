import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Segment } from "semantic-ui-react";
import * as actions from '../../actions';

import PhoneZone from "./PhoneTimeZoneComponent";

class Account extends Component {
  constructor(props){
    super(props);
    console.log("PROPS", props.auth.user.user);

    if (props.auth.user.user.timeZone !== undefined && props.auth.user.user.phoneNumber !== undefined){
      this.state = {
        timeZone: props.auth.user.user.timeZone,
        phoneNumber: props.auth.user.user.phoneNumber
      }
    }else {
      this.state = {
        timeZone: "",
        phoneNumber: ""
      }
    }

    props.headerLocation('Account Page');
  }

  handleUpdate(phoneNumber, timeZone){
    this.setState({phoneNumber, timeZone});
  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <PhoneZone handleUpdate={this.handleUpdate.bind(this)} phoneNumber={this.state.phoneNumber} timeZone={this.state.timeZone}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Account);
