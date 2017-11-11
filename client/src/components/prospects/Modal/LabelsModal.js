import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class LabelsModal extends Component {
  constructor(props) {
    super(props);
    let masterOptions = props.masterLabels;
    var list = [];
    if (props.labelsChosen !== []) {
      this.props.labelsChosen.forEach(label => {
        list.push(label.value);
      });
    }
    this.state = {
      masterOptions: masterOptions,
      currentValue: list
    };
  }

  render() {
    return (
      <Dropdown
        options={this.state.masterOptions}
        selection
        search
        allowAdditions
        value={this.state.currentValue}
        multiple
        disabled
      />
    );
  }
}

export default LabelsModal;
