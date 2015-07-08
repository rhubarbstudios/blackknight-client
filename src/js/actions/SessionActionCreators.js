import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import WebAPIUtils from '../utils/WebAPIUtils.js';

let ActionTypes = Constants.ActionTypes;

export default {

  signup(email, username, password, passwordConfirmation) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, username, password, passwordConfirmation);
  },

  login(email, password) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }

};
