import React from "react";
import "./Stickers.css";

const StudentChoice = props => {
  return (
    <div>
      <button className="stick">
        <img
          className="student-choice"
          src={props.src}
          alt={props.alt}
          onClick={props.onClick}
        />
      </button>
    </div>
  );
};

export default StudentChoice;
