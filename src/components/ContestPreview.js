import React, { Component } from 'react';
import PropTypes from 'prop-types';
//var PropTypes = require('prop-types');

class ContestPreview extends Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  render() {
    return(
      <div className="link ContestPreview" onClick={this.handleClick}>
        <div className="category-name">
          {this.props.categoryName}
        </div>
        <div className="contest-name">
          {this.props.contestName}
        </div>
      </div>
    );
  }
}

ContestPreview.propTypes = {
  _id: PropTypes.string,
  categoryName: PropTypes.string,
  contestName: PropTypes.string,
  onClick: PropTypes.func,
};



export default ContestPreview;
