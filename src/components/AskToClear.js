import React from "react";
// import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import "../App.css";
import LinkButton from "./LinkButton";

const AskToClear = props => {
  return (
    <div>
      <p>Do you want to start over?</p>
      {/* <Link to="/home/" className="student__delete btn btn-primary">
        New Board
      </Link>
      <button onClick={props.clear} className="student__delete btn btn-primary">
        Cancel
      </button> */}
      <button
        onClick={props.restart}
        className="nav-link btn btn-color font-face"
      >
        Choose student
      </button>
      {/* <button onClick={props.stay} className="nav-link btn btn-color font-face"> */}
      <LinkButton to="/home/board" className="nav-link btn btn-color font-face">
        Go to board>
      </LinkButton>
      ;{/* 
        Go to board
      </button> */}
    </div>
  );
};

export default AskToClear;
