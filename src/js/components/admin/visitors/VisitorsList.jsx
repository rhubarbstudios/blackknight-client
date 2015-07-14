import React from 'react';
import AdminActionCreators from '../../../actions/AdminActionCreators';
import VisitorActionCreators from '../../../actions/VisitorActionCreators';
import VisitorStore from '../../../stores/VisitorStore';
import VisitorListItem from './VisitorListItem';
import {List, Styles, FloatingActionButton} from 'material-ui';
import AddIcon from '../../common/icons/AddIcon';
import {Link} from 'react-router';
import Stylizer from '../../../utils/Stylizer';

let ThemeManager = new Styles.ThemeManager();

function getStateFromStores() {
  return {
    visitors: VisitorStore.getVisitors()
  };
}

export default React.createClass({

  componentWillMount() {
    AdminActionCreators.updateHeading('Visitors');
    VisitorActionCreators.getVisitors();
    VisitorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    VisitorStore.removeChangeListener(this._onChange);
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
            return <VisitorListItem visitor={visitor} key={visitor._id} />;
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

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
