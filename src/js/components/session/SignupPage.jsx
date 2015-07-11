import React from 'react';
import SessionActionCreators from '../../actions/SessionActionCreators';
import SessionStore from '../../stores/SessionStore';
import ErrorNotice from '../../components/common/ErrorNotice';

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

  render() {
    let errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <div className="card card--login small-10 medium-6 large-4 columns small-centered">
            <form onSubmit={this._onSubmit}>
              <div className="card--login__field">
                <label name="email">Email</label>
                <input type="text" name="email" ref="email" />
              </div>
              <div className="card--login__field">
                <label name="username">Username</label>
                <input type="text" name="username" ref="username" />
              </div>
              <div className="card--login__field">
                <label name="password">Password</label>
                <input type="password" name="password" ref="password" />
              </div>
              <div className="card--login__field">
                <label name="password-confrimation">Password confirmation</label>
                <input type="password" name="password-confirmation" ref="passwordConfirmation" />
              </div>
              <button type="submit" className="card--login__submit">Signup</button>
            </form>
          </div>
        </div>
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
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    let passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value;
    if (password !== passwordConfirmation) {
      this.setState({ errors: ['Password and password confirmation should match']});
    } else {
      SessionActionCreators.signup(email, username, password, passwordConfirmation);
    }
  }

});
