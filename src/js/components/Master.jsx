import React from 'react';
import SessionStore from '../stores/SessionStore';
import ErrorStore from '../stores/ErrorStore';
import Stylizer from '../utils/Stylizer';
import {Styles, Snackbar} from 'material-ui';
import {RouteHandler} from 'react-router';

let ThemeManager = new Styles.ThemeManager();

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail(),
    errorMessage: ErrorStore.getMessage()
  };
}

export default React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
    ErrorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
    ErrorStore.removeChangeListener(this._onChange);
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getStyles() {
    return Stylizer.stylize({
      container: {
        height: '100%'
      }
    });
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <Snackbar
          ref="snackbar"
          message={this.state.errorMessage || ''}
          action="ok"
          autoHideDuration={3000}
          onActionTouchTap={this._hideSnackbar} />
        <RouteHandler />
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
    if (this.state.errorMessage) {
      this.refs.snackbar.show();
    }
  },

  _hideSnackbar() {
    this.refs.snackbar.dismiss();
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.func
  }

});
