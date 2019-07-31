import React from "react";
// import { Link } from "react-router-dom";
import LinkButton from "./LinkButton";
//import PropTypes from "prop-types";
import "../App.css";

const SelectStudent = props => {
  return (
    <div>
      <p>You must select a student:</p>
      <LinkButton to="/home" className="nav-link btn btn-color font-face">
        Dashboard
      </LinkButton>
    </div>
  );
};

export default SelectStudent;
