import keyMirror from 'react/lib/keyMirror';

let APIRoot = 'http://localhost:3000';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  APIEndpoints: {
    LOGIN: APIRoot + '/v1/login',
    REGISTRATION: APIRoot + '/v1/users',
    STORIES: APIRoot + '/v1/stories'
  },

  // Each time you add an action, add it here... They should be past-tense
  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    LOAD_STORIES: null,
    RECEIVE_STORIES: null,
    LOAD_STORY: null,
    RECEIVE_STORY: null,
    CREATE_STORY: null,
    RECEIVE_CREATED_STORY: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
