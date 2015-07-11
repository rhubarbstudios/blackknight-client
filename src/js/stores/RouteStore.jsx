import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import SessionStore from '../stores/SessionStore';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import Router from 'react-router';
// import routes from '../routes.jsx';

// let router = Router.create({
//   routes: routes,
//   location: Router.HistoryLocation
// });

let ActionTypes = Constants.ActionTypes;

const RouteStore = assign({}, BaseStore, {

  // getRouter() {
  //   return router;
  // },

  redirectHome() {
    Router.transitionTo('app');
  }
});

RouteStore.dispatchToken = Dispatcher.register((payload) => {
  Dispatcher.waitFor([
    SessionStore.dispatchToken
    // StoryStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.type) {

    case ActionTypes.REDIRECT:
      Router.transitionTo(action.route);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        Router.transitionTo('app');
      }
      break;

    case ActionTypes.RECEIVE_CREATED_STORY:
      Router.transitionTo('app');
      break;

    default:
  }

  return true;
});

export default RouteStore;
