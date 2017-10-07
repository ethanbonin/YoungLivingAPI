import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Card } from "semantic-ui-react";
import TopBar from "./QuickStats";
import Tab from "./Tab";
import _ from "lodash";

// https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?h=350&auto=compress&cs=tinysrgb
const imageSrc = {
  stats: "https://images.unsplash.com/photo-1457904375453-3e1fc2fc76f4?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=",
  pros: "https://images.unsplash.com/photo-1441205337478-70cb1521e35a?dpr=1&auto=compress,format&fit=crop&w=3900&h=&q=80&cs=tinysrgb&crop=",
  down: "https://images.unsplash.com/photo-1469234441726-091a01eb77d1?dpr=1&auto=compress,format&fit=crop&w=2562&h=&q=80&cs=tinysrgb&crop=",
  alerts: "https://images.unsplash.com/photo-1506377711776-dbdc2f3c20d9?dpr=1&auto=compress,format&fit=crop&w=2550&h=&q=80&cs=tinysrgb&crop="
}

const _TABS = [
  { name: "Stats", color: "blue", image: imageSrc.stats  },
  { name: "Prospects", color: "pink", image: imageSrc.pros  },
  { name: "Downline", color: "green", image: imageSrc.down },
  { name: "Alerts", color: "grey", image: imageSrc.alerts }
];

class DashBoard extends Component {
  constructor(props) {
    super();
  }

  renderTabs() {
    console.log("THIS IS MATCH",this.props.match.url)
    return _.map(_TABS, ({ name, color, image }) => {
      return <Tab key={name} name={name} color={color} image={image} url={this.props.match.url} />;
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <Card.Group itemsPerRow={2} style={{}}>
            {this.renderTabs()}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default DashBoard;
