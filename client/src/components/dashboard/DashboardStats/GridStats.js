import React, { Component } from "react";
import { Segment, Statistic, Label, Grid } from "semantic-ui-react";

import "../dashboardcss/dashboard.css";

class GridStats extends Component {
  render() {
    return (
      <div className="grid_stats">
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Label>PV</Label>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Label>OGV</Label>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Label>PGV</Label>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Label>Total Downline</Label>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default GridStats;
