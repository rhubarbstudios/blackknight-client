import React from 'react';
import {Styles, CircularProgress} from 'material-ui';
import Stylizer from '../../utils/Stylizer';

let ThemeManager = new Styles.ThemeManager();
let timeout;

export default React.createClass({

  componentDidMount() {
    timeout = window.setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 1000);
  },

  componentWillUnmount() {
    window.clearTimeout(timeout);
  },

  getInitialState() {
    return {
      visible: false
    };
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getStyles() {
    return Stylizer.stylize({
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      },

      progress: {
        marginTop: '-25%'
      }
    });
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        { this.state.visible
          ? <CircularProgress
              mode="indeterminate"
              style={styles.progress} />
          : <div /> }
      </div>
    );
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }
});
