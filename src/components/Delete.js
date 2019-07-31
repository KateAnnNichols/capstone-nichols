import React from "react";
//import PropTypes from "prop-types";

const Delete = props => {
  return (
    <div>
      <div>Do you wish to delete {props.student.name}?</div>
      <button onClick={props.deleteStudent}>Yes</button>
      <button onClick={props.cancel}>No</button>
    </div>
  );
};

export default Delete;
