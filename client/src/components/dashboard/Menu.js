import React, { Component } from "react";
import { Menu, Label } from 'semantic-ui-react'
import {Link} from "react-router-dom";


class MenuBar extends Component {
  constructor(props) {
    super();
    this.state = {
      activeItem: ""
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu size="massive" fluid widths={2}>
        <Menu.Item as={Link} to={'/dashboard/prospects'} name='Prospects' active={activeItem === 'prospects'} onClick={this.handleItemClick} />
        {/* <Menu.Item name='Stats' active={activeItem === 'stats'} onClick={this.handleItemClick} /> */}
        <Menu.Item name='Commuicator' active={activeItem === 'communicator'} onClick={this.handleItemClick} />
      </Menu>
    )
  }

}


  export default MenuBar;
