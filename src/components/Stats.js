import React from "react";
// import { format } from "date-fns";
//import PropTypes from "prop-types";

const Stats = props => {
  const allBoardsCompleted = student => {
    const boards = student.boardsCompletedByDate;
    return boards.length > 0
      ? boards.map((byDate, idx) => {
          return byDate.day ? (
            <p key={idx}>
              {byDate.day}: {byDate.boardsCompleted} boards completed
            </p>
          ) : (
            ""
          );
        })
      : "No boards completed!";
  };

  return (
    <div className="stats">
      {/* <p className="student_stats">{props.student.name}</p> */}
      <div>{allBoardsCompleted(props.student)}</div>
      <button onClick={props.cancel}>Return</button>
    </div>
  );
};

export default Stats;
