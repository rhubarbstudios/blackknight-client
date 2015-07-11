import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let ActionTypes = Constants.ActionTypes;

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
let _accessToken = sessionStorage.getItem('accessToken');
let _email = sessionStorage.getItem('email');
let _errors = [];

const SessionStore = assign({}, BaseStore, {

  isLoggedIn() {
    return _accessToken ? true : false;
  },

  getAccessToken() {
    return _accessToken;
  },

  getEmail() {
    return _email;
  },

  getErrors() {
    return _errors;
  }

});

SessionStore.dispatchToken = Dispatcher.register((payload) => {
  let action = payload.action;

  switch (action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.access_token) {
        _accessToken = action.json.access_token;
        _email = action.json.email;
        // Token will always live in the session, so that the API can grab it with no hassle
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('email', _email);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _email = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      SessionStore.emitChange();
      break;

    default:
  }

  return true;
});

export default SessionStore;
