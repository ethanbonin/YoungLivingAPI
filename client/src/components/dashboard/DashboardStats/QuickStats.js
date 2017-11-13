import React, { Component } from "react";
import { Segment, Statistic, Label, Grid } from "semantic-ui-react";

import GridStats from './GridStats';

import "../dashboardcss/dashboard.css";

class QuickStats extends Component {
  render() {
    return (
      <Segment>
        <Label
          className="quick_stats_header_label"
          basic
          color="teal"
          size="massive"
        >
          These are your quick stats for the day.
        </Label>
        <GridStats />
      </Segment>
    );
  }
}

export default QuickStats;
