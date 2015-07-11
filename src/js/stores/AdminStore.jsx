import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let ActionTypes = Constants.ActionTypes;

let _heading = '';

const AdminStore = assign({}, BaseStore, {

  getHeading() {
    return _heading;
  }

});

AdminStore.dispatchToken = Dispatcher.register((payload) => {
  let action = payload.action;

  switch (action.type) {

    case ActionTypes.UPDATE_HEADING:
      if (action.title) {
        _heading = action.title;
      }
      AdminStore.emitChange();
      break;

    default:
  }

  return true;
});

export default AdminStore;
