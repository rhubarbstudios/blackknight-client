import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

let ActionTypes = Constants.ActionTypes;

export default {

  receiveLogin(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveVisitors(visitors, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.VISITORS_RECEIVED,
      visitors: visitors,
      errors: errors
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
