import React, { Component } from "react";
import { Segment, Statistic } from "semantic-ui-react";
import Tooltip from "./Tooltip";

class TopBar extends Component {
  render() {
    return (
      <div>
        <Segment inverted className="center" style={{ marginTop: "7px" }}>
          <Statistic inverted>
            <Statistic.Value>
              <Tooltip name="users" />
              363
            </Statistic.Value>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>
              <Tooltip name="plus" />
              14
            </Statistic.Value>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>
              <Tooltip name="checkmark" />
              27
            </Statistic.Value>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>
              <Tooltip name="warning" />
              5
            </Statistic.Value>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>
              <Tooltip name="object group" />
              5
            </Statistic.Value>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>
              <Tooltip name="object group" />
              5
            </Statistic.Value>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>
              <Tooltip name="object group" />
              5
            </Statistic.Value>
          </Statistic>
        </Segment>
      </div>
    );
  }
}

export default TopBar;
