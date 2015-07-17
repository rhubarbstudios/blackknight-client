import keyMirror from 'react/lib/keyMirror';

let APIRoot = 'http://blackknight-server.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
  APIRoot = 'http://blackknight.dev:9000';
}
console.log('APIRoot: ', APIRoot);

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  APIEndpoints: {
    LOGIN: APIRoot + '/v1/login',
    REGISTRATION: APIRoot + '/v1/users',
    STORIES: APIRoot + '/v1/stories',
    GET_VISITORS: APIRoot + '/visitors',
    GET_VISITOR: APIRoot + '/visitors',
    SAVE_VISITOR: APIRoot + '/visitors'
  },

  ActionTypes: keyMirror({
    SHOW_ERROR: null,

    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    SIGNUP_REQUEST: null,
    LOGOUT: null,

    // Routes
    REDIRECT: null,

    LOAD_STORIES: null,
    RECEIVE_STORIES: null,
    LOAD_STORY: null,
    RECEIVE_STORY: null,
    CREATE_STORY: null,
    RECEIVE_CREATED_STORY: null,

    // Visitors
    VISITORS_REQUESTED: null,
    VISITORS_RECEIVED: null,
    VISITOR_REQUESTED: null,
    VISITOR_RECEIVED: null,
    SAVE_VISITOR: null,

    // Admin
    UPDATE_HEADING: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
