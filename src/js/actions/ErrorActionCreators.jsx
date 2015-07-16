import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import WebAPIUtils from '../utils/WebAPIUtils';

let ActionTypes = Constants.ActionTypes;

export default {

  showError(message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SHOW_ERROR,
      message: message
    });
  },

  getVisitors() {
    Dispatcher.handleViewAction({
      type: ActionTypes.VISITORS_REQUESTED
    });
    WebAPIUtils.getVisitors();
  },

  getVisitor(id) {
    Dispatcher.handleViewAction({
      type: ActionTypes.VISITOR_REQUESTED
    });
    WebAPIUtils.getVisitor(id);
  },

  saveVisitor(visitor) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SAVE_VISITOR,
      visitor: visitor
    });
    WebAPIUtils.saveVisitor(visitor);
  }

};
