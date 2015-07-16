import React from 'react';
import {Navigation} from 'react-router';
import AdminActionCreators from '../../../actions/AdminActionCreators';
import VisitorActionCreators from '../../../actions/VisitorActionCreators';
import VisitorsStore from '../../../stores/VisitorsStore';
import VisitorListItem from './VisitorListItem';
import {List, Styles, FloatingActionButton} from 'material-ui';
import AddIcon from '../../common/icons/AddIcon';
import {Link} from 'react-router';
import Stylizer from '../../../utils/Stylizer';

let ThemeManager = new Styles.ThemeManager();

function getStateFromStores() {
  return {
    visitors: VisitorsStore.getVisitors()
  };
}

export default React.createClass({

  mixins: [
    Navigation
  ],

  componentDidMount() {
    AdminActionCreators.updateHeading('Visitors');
    VisitorActionCreators.getVisitors();
    VisitorsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    VisitorsStore.removeChangeListener(this._onChange);
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
      floatingActionButton: {
        right: '16px',
        position: 'fixed',
        bottom: '16px',
        zIndex: '2000'
      },

      icon: {
        height: '56px',
        fill: '#fff'
      }
    });
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <List>
          { this.state.visitors.map((visitor) => {
            return (
              <VisitorListItem
                visitor={visitor}
                key={visitor._id}
                onClick={this._handleItemClick.bind(this, visitor._id)} />
            );
          })}
        </List>
        <FloatingActionButton
          style={styles.floatingActionButton}
          linkButton={true}
          containerElement={<Link to="/admin/visitors/new" />}>
          <AddIcon style={styles.icon} />
        </FloatingActionButton>
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  _handleItemClick(id) {
    this.transitionTo('/admin/visitors/' + id);
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
