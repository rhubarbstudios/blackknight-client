import React from 'react';
import {Navigation} from 'react-router';
import SessionStore from '../stores/SessionStore';

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
  };
}

export default React.createClass({

  propTypes: {
    children: React.PropTypes.object
  },

  // mixins: [
  //   Navigation
  // ],

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  }

});
