import React from 'react';

export default React.createClass({
  propTypes: {
    errors: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div className="error-notice">
        <ul>
          {this.props.errors.map((error, index) => {
            return <li className="error-notice__error" key={'error-' + index}>{error}</li>;
          })}
        </ul>
      </div>
      );
  }
});
