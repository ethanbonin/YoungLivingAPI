import React, { Component } from "react";
import { Message } from 'semantic-ui-react'

class NoMatch extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
      <Message
        error
        size="massive"
        header='404 - Could not find the page you were looking for'
      />
      </div>
    );
  }
}

export default NoMatch;
