import React from "react";
import "./Stickers.css";
import "../App.css";
import StudentChoice from "./StudentChoice";
import ReturnToBoard from "./ReturnToBoard";
//import PropTypes from "prop-types";

const Rewards = props => {
  console.log(props.rewards);
  const allStickers = props.rewards.map((reward, idx) => {
    return (
      <div key={idx}>
        <StudentChoice
          alt={reward.alt}
          src={reward.src}
          onClick={props.choose}
        />
      </div>
    );
  });

  return (
    <div>
      <h2>Choose a Reward</h2>
      <div className="sticker-grid">{allStickers}</div>
      <ReturnToBoard
        boardActive={props.boardActive}
        studentActive={props.studentActive}
      />
    </div>
  );
};

export default Rewards;
