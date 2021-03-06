import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import "../prospectscss/prospects.css"

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      prospectsList: this.props.prospects,
    };
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" });
    this.props.handleSearchResults([], this.props.closedSearch);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      let array_of_searched_prospects = [];
      for (var i = 0; i < this.state.prospectsList.prospects.length; i++) {
        let prosp = this.state.prospectsList.prospects[i].first;
        if (prosp.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          array_of_searched_prospects.push(
            this.state.prospectsList.prospects[i]
          );
        }
      }
      this.setState({
        isLoading: false,
        results: array_of_searched_prospects
      });
      this.props.handleSearchResults(array_of_searched_prospects, this.props.closedSearch);
    }, 100);
  };

  render() {
    return (
      <Search
        category
        className="close_deal_searchbar"
        loading={this.state.isLoading}
        placeholder="Search Prospects"
        onSearchChange={this.handleSearchChange}
        value={this.state.value}
        noResultsMessage={"LOADING"}
      />
    );
  }
}

export default connect(null, actions)(Searchbar);
