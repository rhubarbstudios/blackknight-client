import React from 'react';
import {ListItem, Avatar, ListDivider} from 'material-ui';
import Stylizer from '../../../utils/Stylizer';

export default React.createClass({

  propTypes: {
    visitor: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
  },

  getStyles() {
    return Stylizer.stylize({
      p: {
        paddingTop: '0'
      }
    });
  },

  render() {
    let styles = this.getStyles();

    return (
      <div onClick={this.props.onClick}>
        <ListItem
          leftAvatar={<Avatar>{this.props.visitor.firstName.charAt(0)}</Avatar>}
          secondaryText={
            <p style={styles.p}>
              {this.props.visitor.email}
              <br/>
              {this.props.visitor.company}
            </p>
          }
          secondaryTextLines={2}>
          {this.props.visitor.firstName} {this.props.visitor.lastName}
        </ListItem>
        <ListDivider inset={true} />
      </div>
    );
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  }

});
