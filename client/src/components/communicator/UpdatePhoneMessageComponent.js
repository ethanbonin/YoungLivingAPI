import React, {Component} from "react";
import { Message, Input, Button } from "semantic-ui-react";

import "./communicatorcss/communicator.css";

class  UpdatePhoneMessage extends Component{
  state = { value: "" };

  handleUpdateNumberSubmit = (value) => {
    this.props.handleUpdateNumberSubmit(value);
  };

  render(){
    return (
      <Message className="update_phone_message" negative>
        <Message.Header>
          Before you can do anything with communicator you must set your number
        </Message.Header>
        <Message.Content>
          <Input
            className="input_phone_number_message"
            onChange={e => {
              this.setState({value: e.target.value})
            }}
          >
            <input />
            <Button
              icon="phone"
              color="blue"
              placeholder="303-555-5555"
              content="Submit"
              labelPosition="right"
              onClick={() => this.handleUpdateNumberSubmit(this.state.value)}
            />
          </Input>
        </Message.Content>
      </Message>
    );
  }
};

export default UpdatePhoneMessage;
