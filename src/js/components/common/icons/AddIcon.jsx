import React from 'react';
import {SvgIcon} from 'material-ui';

export default React.createClass({
  render() {
    let style = {
      height: '100%'
    };

    return (
      <SvgIcon style={style} {...this.props}>
        <path d="M24,13.7142857 L13.7142857,13.7142857 L13.7142857,24 L10.2857143,24 L10.2857143,13.7142857 L0,13.7142857 L0,10.2857143 L10.2857143,10.2857143 L10.2857143,0 L13.7142857,0 L13.7142857,10.2857143 L24,10.2857143 L24,13.7142857 L24,13.7142857 Z"></path>
      </SvgIcon>
    );
  }
});
