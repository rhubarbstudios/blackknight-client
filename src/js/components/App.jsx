import React from 'react';
import {RouteHandler} from 'react-router';

// var Header = require('../components/Header.react.jsx');
import SessionStore from '../stores/SessionStore';
// import RouteStore from '../stores/RouteStore.jsx';

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
  };
}

export default React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  // <Header
  //   isLoggedIn={this.state.isLoggedIn}
  //   email={this.state.email} />

  render() {
    return (
      <div className="app">
        <RouteHandler/>
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  }

});
