import React from 'react';
import {Styles, FloatingActionButton} from 'material-ui';
import Stylizer from '../../../utils/Stylizer';

let ThemeManager = new Styles.ThemeManager();

function getStateFromStores() {
  return {
    // visitors: VisitorsStore.getVisitors()
  };
}

export default React.createClass({

  propTypes: {
    children: React.PropTypes.object
  },

  componentDidMount() {

  },

  componentWillUnmount() {

  },

  getInitialState() {
    return getStateFromStores();
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
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
        {this.props.children}
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
