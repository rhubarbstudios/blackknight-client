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
import Loading from '../../common/Loading';

let ThemeManager = new Styles.ThemeManager();

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
    return {
      visitors: VisitorsStore.getVisitors(),
      loading: true
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
        height: '100%'
      },

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

    let loading = (
      <Loading />
    );

    let list = (
      <div>
        <List>
          {this.state.visitors.map((visitor) => {
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

    let child = this.state.loading ? loading : list;

    return (
      <div style={styles.container}>
        {child}
      </div>
    );
  },

  _onChange() {
    this.setState({
      visitors: VisitorsStore.getVisitors(),
      loading: false
    });
  },

  _handleItemClick(id) {
    this.transitionTo('/admin/visitors/' + id);
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
