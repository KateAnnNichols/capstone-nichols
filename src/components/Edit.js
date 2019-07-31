import React from "react";
//import PropTypes from "prop-types";

const Edit = props => {
  return (
    <div>
      {/* <p>Edit student name</p> */}
      <p>Old name: {props.student.name}</p>
      <form
        onSubmit={props.editStudent}
        className="student__select btn btn-solid btn-spaced font-face"
      >
        <input type="text" value={props.newName} onChange={props.changeName} />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  );
};

export default Edit;
