import React from 'react';
import {RouteHandler} from 'react-router';
import Stylizer from '../../../utils/Stylizer';

function getStateFromStores() {
  return {
    // visitors: VisitorsStore.getVisitors()
  };
}

export default React.createClass({

  componentDidMount() {

  },

  componentWillUnmount() {

  },

  getInitialState() {
    return getStateFromStores();
  },

  getStyles() {
    return Stylizer.stylize({
      container: {
        height: '100%'
      }
    });
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <RouteHandler />
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func
  }

});
