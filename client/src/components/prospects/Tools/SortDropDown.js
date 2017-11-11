import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { ordering_options } from "../raw_data";

class SortDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_by: "newest"
    };
  }

  handleSortSelect(value) {
    this.props.handleSortSelect(value.value);
  }

  render() {
    return (
      <Dropdown
        text="Sort Prospect"
        icon="sort"
        labeled
        button
        className="sort_tool icon"
        style={{
          marginTop: "1.6em",
          float: "left",
        }}
        onChange={e => console.log()}
      >
        <Dropdown.Menu>
          <Dropdown.Divider />
          <Dropdown.Menu scrolling>
            {ordering_options.map(option => (
              <Dropdown.Item
                key={option.value}
                {...option}
                onClick={() => this.handleSortSelect(option)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connect(null, actions)(SortDropDown);
