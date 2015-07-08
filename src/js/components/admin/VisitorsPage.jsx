import React from 'react';
import SessionActionCreators from '../../actions/SessionActionCreators';
import SessionStore from '../../stores/SessionStore';
import { Styles, AppBar } from 'material-ui';

let ThemeManager = new Styles.ThemeManager();

export default React.createClass({

  getInitialState() {
    return { errors: [] };
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    return (
      <div>
        Visitors!
      </div>
    );
  },

  _onChange() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  _onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(email, password);
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
