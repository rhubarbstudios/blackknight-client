import React from 'react';
import {Navigation} from 'react-router';
import SessionStore from '../../stores/SessionStore';
import AdminStore from '../../stores/AdminStore';
import { Styles, AppBar, LeftNav } from 'material-ui';
import Stylizer from '../../utils/Stylizer';

let ThemeManager = new Styles.ThemeManager();

function getStateFromStores() {
  return {
    errors: SessionStore.getErrors(),
    title: AdminStore.getHeading()
  };
}

export default React.createClass({
  mixins: [
    Navigation
  ],

  propTypes: {
    children: React.PropTypes.object
  },

  getInitialState() {
    return getStateFromStores();
  },

  componentWillMount() {
    SessionStore.addChangeListener(this._onChange);
    AdminStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
    AdminStore.removeChangeListener(this._onChange);
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
      },

      appBar: {
        position: 'fixed'
      },

      childrenContainer: {
        paddingTop: '64px',
        height: '100%'
      }
    });
  },

  render() {
    let menuItems = [
      { route: '/login', text: 'Home' },
      { route: 'admin/visitors', text: 'Visitors' }
    ];

    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <LeftNav
          docked={false}
          menuItems={menuItems}
          ref="leftNav"
          onChange={this._onNavChange} />
        <AppBar
          title={this.state.title}
          onLeftIconButtonTouchTap={this._onClickMenu}
          style={styles.appBar} />
        <div style={styles.childrenContainer}>
          {this.props.children}
        </div>
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  _onClickMenu() {
    this.refs.leftNav.toggle();
  },

  _onNavChange(e, selectedIndex, menuItem) {
    this.transitionTo(menuItem.route);
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
