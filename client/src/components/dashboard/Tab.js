import React, { Component } from "react";
import {Route} from 'react-router-dom';
import { Card } from "semantic-ui-react";



class Tab extends Component {
  render() {
    return (
      <Route exact path="/dashboard/prospects">
        <Card link style={{margin: "1em"}} raised color={this.props.color} image={this.props.image} header={this.props.name} />
      </Route>
    );
  }
}


export default Tab;
