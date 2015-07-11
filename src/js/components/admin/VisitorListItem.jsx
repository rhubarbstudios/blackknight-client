import React from 'react';
import {ListItem, Avatar, Styles, ListDivider} from 'material-ui';

let ThemeManager = new Styles.ThemeManager();

export default React.createClass({

  propTypes: {
    visitor: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    let pStyle = {
      paddingTop: '0'
    };

    return (
      <div>
        <ListItem
          leftAvatar={<Avatar>{this.props.visitor.firstName.charAt(0)}</Avatar>}
          secondaryText={
            <p style={pStyle}>
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

  childContextTypes: {
    muiTheme: React.PropTypes.object
  }

});
