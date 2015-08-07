import React from 'react';
import VisitorStore from '../../../stores/VisitorStore';
import VisitorActionCreators from '../../../actions/VisitorActionCreators';
import ErrorActionCreators from '../../../actions/ErrorActionCreators';
import {Avatar, TextField, DatePicker, RaisedButton, FlatButton} from 'material-ui';
import Stylizer from '../../../utils/Stylizer';
import keyMirror from 'react/lib/keyMirror';
import _ from 'lodash';
import {Link, Navigation} from 'react-router';
import WebAPIUtils from '../../../utils/WebAPIUtils';

const fields = keyMirror({
  FIRST_NAME: null,
  LAST_NAME: null,
  EMAIL: null,
  COMPANY: null,
  FROM: null,
  TO: null
});

export default React.createClass({

  mixins: [
    Navigation
  ],

  propTypes: {
    visitor: React.PropTypes.object
  },

  componentDidMount() {
    this._handleInputChange = _.debounce(this._handleInputChange, 100);
    VisitorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    VisitorStore.removeChangeListener(this._onChange);
  },

  getInitialState() {
    let values = {};

    if (this.props.visitor) {
      let v = this.props.visitor;
      values[fields.FIRST_NAME] = v.firstName;
      values[fields.LAST_NAME] = v.lastName;
      values[fields.EMAIL] = v.email;
      values[fields.COMPANY] = v.company;
      values[fields.FROM] = new Date(v.from);
      values[fields.TO] = new Date(v.to);
    }

    return {
      values: values,
      errors: {},
      saving: false,
      snackBarError: undefined
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

    let form = (
      <div style={styles.container}>
        <Avatar
          src="/images/blank-avatar.png"
          style={styles.avatar} />

        <TextField
          ref={fields.FIRST_NAME}
          floatingLabelText="First Name"
          style={styles.textField}
          defaultValue={this.state.values[fields.FIRST_NAME]}
          errorText={this.state.errors[fields.FIRST_NAME]}
          onChange={this._handleInputChange.bind(this, fields.FIRST_NAME)}
          onBlur={this._handleInputChange.bind(this, fields.FIRST_NAME)} />

        <TextField
          ref={fields.LAST_NAME}
          floatingLabelText="Last Name"
          style={styles.textField}
          defaultValue={this.state.values[fields.LAST_NAME]}
          errorText={this.state.errors[fields.LAST_NAME]}
          onChange={this._handleInputChange.bind(this, fields.LAST_NAME)}
          onBlur={this._handleInputChange.bind(this, fields.LAST_NAME)} />

        <TextField
          ref={fields.EMAIL}
          floatingLabelText="Email"
          style={styles.textField}
          defaultValue={this.state.values[fields.EMAIL]}
          errorText={this.state.errors[fields.EMAIL]}
          onBlur={this._handleInputChange.bind(this, fields.EMAIL)} />

        <TextField
          ref={fields.COMPANY}
          floatingLabelText="Company (optional)"
          style={styles.textField}
          defaultValue={this.state.values[fields.COMPANY]}
          onChange={this._handleInputChange.bind(this, fields.COMPANY)}
          onBlur={this._handleInputChange.bind(this, fields.COMPANY)} />

        <DatePicker
          ref={fields.FROM}
          autoOk={true}
          floatingLabelText="Visiting From"
          style={styles.dateField}
          defaultDate={this.state.values[fields.FROM]}
          errorText={this.state.errors[fields.FROM]}
          onChange={this._handleInputChange.bind(this, fields.FROM)} />

        <DatePicker
          ref={fields.TO}
          autoOk={true}
          floatingLabelText="Visiting To"
          style={styles.dateField}
          defaultDate={this.state.values[fields.TO]}
          errorText={this.state.errors[fields.TO]}
          onChange={this._handleInputChange.bind(this, fields.TO)} />

        <div style={styles.buttonRow}>
          <FlatButton
            label="Cancel"
            linkButton={true}
            containerElement={<Link to="/admin/visitors" />} />
          <RaisedButton
            label={this.state.saving ? 'Saving...' : 'Save'}
            primary={true}
            style={styles.raisedButton}
            onClick={this._onSave}/>
        </div>
      </div>
    );

    return (
      <div>
        {form}
      </div>
    );
  },

  _onSave() {
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        this._validateField(field);
      }
    }

    if (!_.any(this.state.errors)) {
      // let visitor = _.extend({}, this.state.values);
      let v = this.state.values;
      let visitor = {
        firstName: v[fields.FIRST_NAME],
        lastName: v[fields.LAST_NAME],
        email: v[fields.EMAIL],
        company: v[fields.COMPANY],
        dates: {
          from: v[fields.FROM].toISOString(),
          to: v[fields.TO].toISOString()
        }
      };

      VisitorActionCreators.saveVisitor(visitor);
      this.setState({ saving: true });
    }
  },

  _handleInputChange() {
    this._validateField.apply(this, arguments);
  },

  _validateField(field) {
    let currentValues = this.state.values;
    let currentErrors = this.state.errors;
    let value;
    let error;

    switch (field) {
      case fields.FIRST_NAME:
        value = _.trim(this.refs[fields.FIRST_NAME].getValue());
        if (value.length === 0) {
          error = 'Please enter a first name';
          value = undefined;
        }

        currentValues[fields.FIRST_NAME] = value;
        currentErrors[fields.FIRST_NAME] = error;
        break;

      case fields.LAST_NAME:
        value = _.trim(this.refs[fields.LAST_NAME].getValue());

        if (value.length === 0) {
          error = 'Please enter a last name';
          value = undefined;
        }

        currentValues[fields.LAST_NAME] = value;
        currentErrors[fields.LAST_NAME] = error;
        break;

      case fields.EMAIL:
        value = _.trim(this.refs[fields.EMAIL].getValue());
        let emailRegex = new RegExp(/.+@.+\..+/i);

        if (value.length === 0 || !emailRegex.test(value)) {
          error = 'Please enter a valid email';
          value = undefined;
        }

        currentValues[fields.EMAIL] = value;
        currentErrors[fields.EMAIL] = error;
        break;

      case fields.COMPANY:
        value = this.refs[fields.COMPANY].getValue();
        value = value.length ? value : undefined;
        currentValues[fields.COMPANY] = value;
        break;

      case fields.FROM:
        value = this.refs[fields.FROM].getDate();

        if (typeof value === 'undefined') {
          error = 'Please choose a date';
        }

        currentValues[fields.FROM] = value;
        currentErrors[fields.FROM] = error;
        break;

      case fields.TO:
        value = this.refs[fields.TO].getDate();

        if (typeof value === 'undefined') {
          error = 'Please choose a date';
        }

        currentValues[fields.TO] = value;
        currentErrors[fields.TO] = error;
        break;
      default:
    }

    this.setState({
      values: currentValues,
      errors: currentErrors
    });
  },

  _onChange() {
    let error = VisitorStore.getError();

    if (error) {
      ErrorActionCreators.showError(error);
      this.setState({
        saving: false
      });
    } else {
      WebAPIUtils.getVisitors();
      this.transitionTo('/admin/visitors');
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  }
});
