import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let ActionTypes = Constants.ActionTypes;

let _visitor = {};
let _error;

const VisitorStore = assign({}, BaseStore, {

  get() {
    return _visitor;
  },

  getError() {
    return _error;
  }

});

VisitorStore.dispatchToken = Dispatcher.register((payload) => {
  let action = payload.action;

  switch (action.type) {

    case ActionTypes.VISITOR_RECEIVED:
      _error = action.error;
      _visitor = action.visitor;
      VisitorStore.emitChange(ActionTypes.VISITOR_RECEIVED);
      break;

    case ActionTypes.VISITOR_UPDATED:
      _error = action.error;
      VisitorStore.emitChange(ActionTypes.VISITOR_UPDATED);
      break;

    default:
  }

  return true;
});

export default VisitorStore;
