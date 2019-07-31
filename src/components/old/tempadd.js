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
          value="submit"
          className="student__select btn btn-solid btn-spaced font-face"
        />
      </form>
      {/* <button onClick={props.returnToList}
      className="student__select btn btn-solid btn-spaced font-face"
      >Cancel</button> */}
    </div>
  );
};

export default Add;



import React from "react";
//import PropTypes from "prop-types";

const Edit = props => {
  return (
    <div>
      <p>Edit student name</p>
      <p>Old name: {props.student.name}</p>
      <form onSubmit={props.editStudent}
        className="student__select btn btn-solid btn-spaced font-face">
        <input type="text" value={props.newName} onChange={props.changeName} />
        <input type="submit" value="submit" />
      </form>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  );
};

export default Edit;