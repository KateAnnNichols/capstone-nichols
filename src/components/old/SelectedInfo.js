import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./SelectedInfo.css";

class SelectedInfo extends Component {
  render() {
    return (
      <div className="selected-info">
        <div>
          <strong>current teacher:</strong>
          <br />
          {this.props.teacher.name}
          <br />
        </div>
        <div>
          <strong>current student:</strong>
          <br />
          {this.props.student.name}
        </div>
      </div>
    );
  }
}

export default SelectedInfo;
