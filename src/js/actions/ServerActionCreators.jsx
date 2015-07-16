import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import WebAPIUtils from '../utils/WebAPIUtils';

let ActionTypes = Constants.ActionTypes;

export default {

  receiveLogin(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveVisitors(error, visitors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.VISITORS_RECEIVED,
      visitors: visitors,
      error: error
    });
  },

  receiveVisitor(error, visitor) {
    Dispatcher.handleServerAction({
      type: ActionTypes.VISITOR_RECEIVED,
      visitor: visitor,
      error: error
    });
  },

  receiveVisitorUpdate(error, response) {
    Dispatcher.handleServerAction({
      type: ActionTypes.VISITOR_UPDATED,
      response: response,
      error: error
    });
  }

  // receiveStories: function(json) {
  //   SmallAppDispatcher.handleServerAction({
  //     type: ActionTypes.RECEIVE_STORIES,
  //     json: json
  //   });
  // },
  //
  // receiveStory: function(json) {
  //   SmallAppDispatcher.handleServerAction({
  //     type: ActionTypes.RECEIVE_STORY,
  //     json: json
  //   });
  // },
  //
  // receiveCreatedStory: function(json, errors) {
  //   SmallAppDispatcher.handleServerAction({
  //     type: ActionTypes.RECEIVE_CREATED_STORY,
  //     json: json,
  //     errors: errors
  //   });
  // }

};
