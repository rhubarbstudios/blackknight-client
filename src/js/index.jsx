import React from 'react';
import { Router, Route, DefaultRoute } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import App from './components/App';
import LoginPage from './components/session/LoginPage';
import SignupPage from './components/session/SignupPage';
import AdminPages from './components/admin/AdminPages';
import AdminVisitorsPage from './components/admin/VisitorsPage';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

React.render((
  <Router history={BrowserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="admin" component={AdminPages}>
        <Route path="visitors" component={AdminVisitorsPage} />
      </Route>
    </Route>
  </Router>
), document.getElementById('main'));
