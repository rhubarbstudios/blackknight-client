import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
// import WebAPIUtils from '../utils/WebAPIUtils.js';

let ActionTypes = Constants.ActionTypes;

export default {

  updateHeading(title) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_HEADING,
      title: title
    });
  }

};
