import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

let ActionTypes = Constants.ActionTypes;

export default {

  redirect(route) {
    Dispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

};
