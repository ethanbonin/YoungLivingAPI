import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

// const options = [
//   { key: "master", text: "Master", value: "master" },
//   { key: "Event", text: "French", value: "French" },
//   { key: "Spanish", text: "Spanish", value: "Spanish" },
//   { key: "German", text: "German", value: "German" },
//   { key: "Chinese", text: "Chinese", value: "Chinese" }
// ];

class LabelsDropDown extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    let masterOptions = props.masterList;
    this.state = {
      masterOptions: masterOptions,
      currentValue: []
    }
  }

  handleAddition = (e, { value }) => {
    this.setState({
      masterOptions: [{ key: value, text: value, value }, ...this.state.masterOptions]
    });
  };

  handleChange = (e, { value }) => {
    this.setState({ currentValue: value });
    this.props.handleLabelAddition(value);
  }

  render() {

    return (
      <Dropdown
        options={this.state.masterOptions}
        placeholder="Add Tags"
        search
        selection
        fluid
        allowAdditions
        value={this.state.currentValue}
        multiple
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
}

export default LabelsDropDown;
