import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let ActionTypes = Constants.ActionTypes;

let _message;

const ErrorStore = assign({}, BaseStore, {

  getMessage() {
    return _message;
  }

});

ErrorStore.dispatchToken = Dispatcher.register((payload) => {
  let action = payload.action;

  switch (action.type) {

    case ActionTypes.SHOW_ERROR:
      _message = action.message;
      ErrorStore.emitChange();
      break;

    default:
  }

  return true;
});

export default ErrorStore;
