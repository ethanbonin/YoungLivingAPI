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
    console.log("inside listprops", this.props.labelsChosen);
    let masterOptions = props.masterList;

    var list = [];
    if (this.props.labelsChosen !== []){
      this.props.labelsChosen.forEach((label) => {
          console.log("Pushing", label.value);
          list.push(label.value);
      })
    }

    console.log('list is', list);



    this.state = {
      masterOptions: masterOptions,
      currentValue: list
    }
  }

  handleAddition = (e, { value }) => {
    this.setState({
      masterOptions: [{ key: value, text: value, value }, ...this.state.masterOptions]
    });
  };

  handleChange = (e, { value }) => {
    this.setState({ currentValue: value });
    console.log("this.currentvalue", this.state.currentValue);
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
