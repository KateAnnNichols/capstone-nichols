import React from "react";
//import PropTypes from "prop-types";

const Add = props => {
  return (
    <div>
      <h2>Add New Student</h2>
      <form
        onSubmit={props.onAddStudent}
        className="student__select btn btn-solid btn-spaced font-face"
      >
        <input
          type="text"
          value={props.newStudent}
          onChange={props.onEnterName}
        />
        <input
          type="submit"
          value="Submit"
          className="student__select btn btn-solid btn-spaced font-face"
        />
      </form>
      {/* <button onClick={props.returnToList}>Cancel</button> */}
    </div>
  );
};

export default Add;
