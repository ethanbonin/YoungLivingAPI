import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

const options = [
  { key: "master", text: "Master", value: "master" },
  { key: "Event", text: "French", value: "French" },
  { key: "Spanish", text: "Spanish", value: "Spanish" },
  { key: "German", text: "German", value: "German" },
  { key: "Chinese", text: "Chinese", value: "Chinese" }
];

class LabelsDropDown extends Component {
  constructor(props) {
    super(props);
    console.log("props");
  }
  state = { options };

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    });
  };

  handleChange = (e, { value }) => this.setState({ currentValue: value });

  render() {
    const { currentValue } = this.state;

    return (
      <Dropdown
        options={this.state.options}
        placeholder="Add Labels"
        search
        selection
        fluid
        allowAdditions
        value={currentValue}
        multiple
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
}

export default LabelsDropDown;
