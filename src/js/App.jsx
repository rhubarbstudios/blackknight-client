import React from 'react';
import Router from 'react-router';
import AppRoutes from './AppRoutes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
React.initializeTouchEvents(true);

Router
  .create({
    routes: AppRoutes,
    location: Router.HistoryLocation,
    scrollBehavior: Router.ScrollToTopBehavior
  })
  .run(Handler => {
    React.render(<Handler />, document.getElementById('main'));
  });
