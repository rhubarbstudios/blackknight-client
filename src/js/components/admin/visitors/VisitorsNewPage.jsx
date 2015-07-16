import React from 'react';
import AdminActionCreators from '../../../actions/AdminActionCreators';
import VisitorsAddEditForm from './VisitorsAddEditForm';

export default React.createClass({

  componentDidMount() {
    AdminActionCreators.updateHeading('New Visitor');
  },

  render() {
    return (
      <VisitorsAddEditForm />
    );
  }
});
