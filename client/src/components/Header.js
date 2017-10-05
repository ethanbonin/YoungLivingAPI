import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Login from './Login';

class Header extends Component {
  constructor(props) {
    super();
    this.state = {showCard: false};
    this.renderContent = this.renderContent.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a onClick={() => this.setState({showCard: !this.state.showCard})}>Login</a></li>;
      default:
        return [
          <li key="2"><a href="/v0/yl/logout">Logout</a></li>
        ];
    }
  };

  headerBar(){
    return (
      <nav>
        <div className="nav-wrapper blue-grey lighten-1">
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="left brand-logo" style={{marginLeft: '1em'}}
          >
            Essential Assistant
          </Link>
          <ul className="right" style={{marginRight:'1em'}}>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  };


  render() {
    return (
      <div>
        {this.headerBar()}
        {this.state.showCard ? <Login removeCard={this.removeCard}/> : null}
      </div>
    );
  }

  removeCard(value){
    this.setState({showCard: false});
    this.props.checkIfLoggedIn();
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);

// OLD VERSION
// function mapStateToProps(state){
//   return {auth: state.auth};
// };

// export default connect(mapStateToProps)(Header);
