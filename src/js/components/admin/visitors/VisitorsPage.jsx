import React from 'react';
import {List, Styles, FloatingActionButton} from 'material-ui';

let Colors = Styles.Colors;
let ThemeManager = new Styles.ThemeManager();

function getStateFromStores() {
  return {
    // visitors: VisitorStore.getVisitors()
  };
}

export default React.createClass({

  propTypes: {
    children: React.PropTypes.object
  },

  componentWillMount() {

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

  render() {
    return (
      <div>
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
