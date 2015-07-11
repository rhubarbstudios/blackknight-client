import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import WebAPIUtils from '../utils/WebAPIUtils';

let ActionTypes = Constants.ActionTypes;

export default {

  getVisitors() {
    Dispatcher.handleViewAction({
      type: ActionTypes.VISITORS_REQUESTED
    });
    WebAPIUtils.getVisitors();
  }

};
