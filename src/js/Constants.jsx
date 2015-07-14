import keyMirror from 'react/lib/keyMirror';

let APIRoot = 'http://blackknight.dev:9000';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  APIEndpoints: {
    LOGIN: APIRoot + '/v1/login',
    REGISTRATION: APIRoot + '/v1/users',
    STORIES: APIRoot + '/v1/stories',
    GET_VISITORS: APIRoot + '/visitors'
  },

  ActionTypes: keyMirror({
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

    // Admin
    UPDATE_HEADING: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
