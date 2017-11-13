import React, { Component } from "react";
import { Dropdown, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class FilterLabels extends Component {
  constructor(props) {
    super(props);
    console.log("THE PROPS", props);
    this.state = {
      sort_by: ""
    };
  }

  handleFilterSelect(value) {
    this.props.handleFilterSelect(value);
  }

  render() {
    return (
      <Dropdown
        text="Filter by Tags"
        icon="filter"
        labeled
        button
        className="sort_labels_dropdown icon"
        onChange={e => console.log()}
        style={{ marginTop: "1.6em" }}
      >
        <Dropdown.Menu>
          <Label
            basic
            color="red"
            style={{ width: "100%", textAlign: "center" }}
          >
            Choose a Tag
          </Label>
          <Dropdown.Divider />
          <Dropdown.Menu scrolling>
            {this.props.masterList.map(option => (
              <Dropdown.Item
                key={option.value}
                {...option}
                onClick={() => this.handleFilterSelect(option)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connect(null, actions)(FilterLabels);
