import React from 'react';
import Constants from '../../../Constants';
import AdminActionCreators from '../../../actions/AdminActionCreators';
import VisitorActionCreators from '../../../actions/VisitorActionCreators';
import VisitorStore from '../../../stores/VisitorStore';
import VisitorsAddEditForm from './VisitorsAddEditForm';
import {Navigation} from 'react-router';
import {Styles} from 'material-ui';
import Stylizer from '../../../utils/Stylizer';
import Loading from '../../common/Loading';

export default React.createClass({

  mixins: [
    Navigation
  ],

  propTypes: {
    params: React.PropTypes.object
  },

  getInitialState() {
    return {
      loading: true
    };
  },

  componentDidMount() {
    AdminActionCreators.updateHeading('Edit Visitor');
    VisitorStore.addChangeListener(this._onChange);
    VisitorActionCreators.getVisitor(this.props.params.id);
  },

  componentWillUnmount() {
    VisitorStore.removeChangeListener(this._onChange);
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

    let loading = (
      <Loading />
    );

    let form = (
      <VisitorsAddEditForm visitor={this.state.visitor} />
    );

    let child = form;
    if (this.state.loading) {
      child = loading;
    }

    return (
      <div style={styles.container}>
        {child}
      </div>
    );
  },

  _onChange(actionType) {
    switch (actionType) {
      case Constants.ActionTypes.VISITOR_RECEIVED:
        let visitor = VisitorStore.get();
        let error = VisitorStore.getError();

        if (error) {
          this.transitionTo('/admin/visitors');
        } else {
          this.setState({
            visitor: visitor,
            loading: false
          });
        }
        break;

      default:
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  }

});
