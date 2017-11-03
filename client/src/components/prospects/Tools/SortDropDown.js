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
        fluid
        text="Sort Prospect"
        icon="filter"
        labeled
        button
        className="icon"
        style={{ marginTop: "5px" }}
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
    )
  }
}


export default connect(null, actions)(SortDropDown);
