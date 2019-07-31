import React from "react";
import "../App.css";
import LinkButton from "./LinkButton";

const ReturnToBoard = props => {
  // const thisButton, buttonText, buttonLink;

  const buttonText = () => {
    if (props.studentActive && props.boardActive) {
      return "Return to Board";
    } else {
      return "Choose a Student";
    }
  };

  const returnText = buttonText();

  const buttonLink = () => {
    if (props.studentActive && props.boardActive) {
      return "/home/board";
    } else {
      return "/home";
    }
  };

  const returnLink = buttonLink();

  //   thisButton = () => {
  //       if (props.studentActive && this.props.boardActive) {
  //           buttonText = "Return to Board";
  //           buttonLink = "home/board";
  //       } else {
  //           buttonText = "Choose a Student";
  //           buttonLink = "home"
  //       }
  //   };

  return (
    <div>
      <LinkButton to={returnLink} className="nav-link btn btn-color font-face">
        {/* <button
        onClick={props.history.push(returnLink)}
        className="nav-link btn btn-color font-face"
      > */}
        {returnText}
        {/* </button> */}
      </LinkButton>
    </div>
  );
};

export default ReturnToBoard;
