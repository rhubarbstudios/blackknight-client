import React from 'react';
import SessionActionCreators from '../../actions/SessionActionCreators';
import SessionStore from '../../stores/SessionStore';
import ErrorNotice from '../../components/common/ErrorNotice.jsx';

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
                <label name="password">Password</label>
                <input type="password" name="password" ref="password" />
              </div>
              <button type="submit" className="card--login__submit">Login</button>
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
    let password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(email, password);
  }

});
