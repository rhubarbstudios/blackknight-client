import React from 'react';
import AdminActionCreators from '../../../actions/AdminActionCreators';
import {Avatar, Styles, TextField, DatePicker, RaisedButton, FlatButton} from 'material-ui';
import Stylizer from '../../../utils/Stylizer';

let ThemeManager = new Styles.ThemeManager();

function getStateFromStores() {
  return {
    // visitors: VisitorStore.getVisitors()
  };
}

export default React.createClass({

  componentWillMount() {
    AdminActionCreators.updateHeading('New Visitor');
    // VisitorActionCreators.getVisitors();
    // VisitorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    // VisitorStore.removeChangeListener(this._onChange);
  },

  getInitialState() {
    return getStateFromStores();
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getStyles() {
    return Stylizer.stylize({
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 10px 0'
      },

      avatar: {
        width: '150px',
        height: '150px'
      },

      textField: {
        width: '100%'
      },

      dateField: {
        paddingTop: '13px',
        width: '100%'
      },

      buttonRow: {
        width: '100%',
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'flex-end'
      },

      raisedButton: {
        marginLeft: '10px'
      }
    });
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <Avatar
          src="/images/blank-avatar.png"
          style={styles.avatar} />
        <TextField
          floatingLabelText="First Name"
          style={styles.textField} />
        <TextField
          floatingLabelText="Last Name"
          style={styles.textField} />
        <TextField
          floatingLabelText="Email"
          style={styles.textField} />
        <TextField
          floatingLabelText="Company (optional)"
          style={styles.textField} />
        <DatePicker
          hintText="From"
          style={styles.dateField} />
        <DatePicker
          hintText="To"
          style={styles.dateField} />
        <div style={styles.buttonRow}>
          <FlatButton label="Cancel" />
          <RaisedButton label="Save" primary={true} style={styles.raisedButton} />
        </div>

      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
