import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let ActionTypes = Constants.ActionTypes;

let _visitors = [];

const VisitorStore = assign({}, BaseStore, {

  init(visitors) {
    _visitors = visitors;
  },

  getVisitors() {
    return _visitors;
  }

});

VisitorStore.dispatchToken = Dispatcher.register((payload) => {
  let action = payload.action;

  switch (action.type) {

    case ActionTypes.VISITORS_RECEIVED:
      VisitorStore.init(action.visitors);
      VisitorStore.emitChange();
      break;

    default:
  }

  return true;
});

export default VisitorStore;
