import React from "react";
// import LinkButton from "./LinkButton";
//import PropTypes from "prop-types";

const Select = props => {
  return (
    <div>
      <div>Start a new board with {props.student.name}?</div>
      <button
        // to="/home/board"
        onClick={props.select}
        className="nav-link btn btn-color font-face"
      >
        Yes
      </button>
      <button
        onClick={props.cancel}
        className="nav-link btn btn-color font-face"
      >
        Cancel
      </button>
    </div>
  );
};

export default Select;
