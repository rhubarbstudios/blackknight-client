import React from 'react';
import {getRouter} from './stores/RouteStore';
let router = getRouter();

// React.render(<AppContainer />, document.getElementById('main'));
router.run((Handler) => {
  React.render(<Handler />, document.getElementById('main'));
});


// var React = require('react');
// var router = require('./stores/RouteStore.react.jsx').getRouter();
// window.React = React;
//
// router.run(function (Handler, state) {
//   React.render(<Handler/>, document.getElementById('content'));
// });
