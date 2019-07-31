import React from "react";
// import { Redirect } from "react-router-dom";
import "./Stickers.css";
import "../App.css";
import StudentChoice from "./StudentChoice";
import ReturnToBoard from "./ReturnToBoard";
//import PropTypes from "prop-types";

const Stickers = props => {
  console.log(props.stickers);
  console.log(props.student);
  console.log(props.boardInProgress);
  const allStickers = props.stickers.map((sticker, idx) => {
    return (
      <div key={idx}>
        <StudentChoice
          alt={sticker.alt}
          src={sticker.src}
          onClick={props.choose}
        />
      </div>
    );
  });

  return (
    <div>
      <div>
        <h2>Select a Sticker</h2>
        <div className="sticker-grid">{allStickers}</div>
        <ReturnToBoard
          boardActive={props.boardActive}
          studentActive={props.studentActive}
        />
      </div>
    </div>
  );
};

export default Stickers;
