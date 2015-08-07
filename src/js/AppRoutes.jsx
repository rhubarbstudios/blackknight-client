import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import Master from './components/Master';
import LoginPage from './components/session/LoginPage';
import SignupPage from './components/session/SignupPage';
import Admin from './components/admin/Admin';
import AdminVisitorsPage from './components/admin/visitors/VisitorsPage';
import AdminVisitorsListPage from './components/admin/visitors/VisitorsList';
import AdminVisitorsNewPage from './components/admin/visitors/VisitorsNewPage';
import AdminVisitorsEditPage from './components/admin/visitors/VisitorsEditPage';

export default (
  <Route path="/" handler={Master}>
    <Route path="login" handler={LoginPage} />
    <Route path="signup" handler={SignupPage} />
    <Route handler={Admin}>
      <Route handler={AdminVisitorsPage}>
        <Route path="admin/visitors" handler={AdminVisitorsListPage} />
        <Route path="admin/visitors/new" handler={AdminVisitorsNewPage} />
        <Route path="admin/visitors/:id" handler={AdminVisitorsEditPage} />
      </Route>
    </Route>
  </Route>
);




// import React from 'react';
// import {Router, Route} from 'react-router';
// import BrowserHistory from 'react-router/lib/BrowserHistory';
// import App from './components/App';
// import LoginPage from './components/session/LoginPage';
// import SignupPage from './components/session/SignupPage';
// import Admin from './components/admin/Admin';
// import AdminVisitorsPage from './components/admin/visitors/VisitorsPage';
// import AdminVisitorsListPage from './components/admin/visitors/VisitorsList';
// import AdminVisitorsNewPage from './components/admin/visitors/VisitorsNewPage';
// import AdminVisitorsEditPage from './components/admin/visitors/VisitorsEditPage';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();
//
// React.render((
//   <Router history={BrowserHistory}>
//     <Route path="/" component={App}>
//       <Route path="login" component={LoginPage} />
//       <Route path="signup" component={SignupPage} />
//       <Route component={Admin}>
//         <Route component={AdminVisitorsPage}>
//           <Route path="admin/visitors" component={AdminVisitorsListPage} />
//           <Route path="admin/visitors/new" component={AdminVisitorsNewPage} />
//           <Route path="admin/visitors/:id" component={AdminVisitorsEditPage} />
//         </Route>
//       </Route>
//     </Route>
//   </Router>
// ), document.getElementById('main'));
