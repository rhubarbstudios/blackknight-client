import React from 'react';
import { Route, DefaultRoute } from 'react-router';
// var React = require('react');
// var Router = require('react-router');
// var Route = Router.Route;
// var DefaultRoute = Router.DefaultRoute;
import App from './components/App.jsx';
import LoginPage from './components/session/LoginPage.jsx';
import SignupPage from './components/session/SignupPage.jsx';
import AdminPages from './components/admin/AdminPages.jsx';
import AdminVisitorsPage from './components/admin/VisitorsPage.jsx';
// var App = require('./components/App.react.jsx');
// var LoginPage = require('./components/session/LoginPage.react.jsx');
// var StoriesPage = require('./components/stories/StoriesPage.react.jsx');
// var StoryPage = require('./components/stories/StoryPage.react.jsx');
// var StoryNew = require('./components/stories/StoryNew.react.jsx');
// var SignupPage = require('./components/session/SignupPage.react.jsx');


module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={LoginPage} />
    <Route name="login" path="/login" handler={LoginPage} />
    <Route name="signup" path="/signup" handler={SignupPage} />
    <Route name="admin" path="/admin" handler={AdminPages}>
      <Route name="visitors" path="/admin/visitors" handler={AdminVisitorsPage} />
    </Route>
  </Route>
);
