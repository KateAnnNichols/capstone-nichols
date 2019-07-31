// Page provides info on students belonging to teacher, and options to CRUD students
// GETS all <Student>s with teacherName matching logged in teacher
// Maps all <Student>s into list of components
// Passes up props of selected student to <Home>, for SelectedInfo
//

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as API from "../helpers/API";
// import axios from "axios";
import Student from "./Student";
import { AddStudent } from "./StudentOptions";
// import './CustomerList.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: true,
      newStudent: "Enter name"
    };
  }

  // FOR ADD STUDENT

  onEnterName = event => {
    const name = event.target.value.trim();
    this.setState(state => ({ newStudent: name }));
  };

  onAddStudent = event => {
    if (this.state.newStudent) {
      console.log(this.state.newStudent);
      API.addStudent(this.state.newStudent)
        .then(console.log(`Current Student = ${this.state.newStudent}`))
        .then(this.returnToList(event));
    } else {
      alert("Please enter student name");
    }
  };

  // FOR CONDITIONAL RENDERING
  add = state => {
    this.setState(state => ({ detail: "add" }));
  };

  del = state => {
    this.setState(state => ({ detail: "del" }));
  };

  edit = state => {
    this.setState(state => ({ detail: "edit" }));
  };

  list = state => {
    this.setState(state => ({ detail: "list" }));
  };

  select = state => {
    this.setState(state => ({ detail: "select" }));
  };

  stats = state => {
    this.setState(state => ({ detail: "stats" }));
  };

  onDisplay = (state, props) => {
    switch (state) {
      case "list":
        return <StudentList students={this.props.students} />;
      case "del":
        return (
          <Del
            selectStudent={this.props.func.onSelectStudent}
            deleteStudent={this.props.func.onDeleteStudent}
            student={this.props.student}
          />
        );
      case "edit":
        return (
          <Edit
            selectStudent={this.props.func.onSelectStudent}
            editStudent={this.props.func.onEditStudent}
            student={this.props.student}
          />
        );
      case "select":
        return (
          <Select
            selectStudent={this.props.func.onSelectStudent}
            student={this.props.student}
          />
        );
      case "stats":
        return (
          <Stats
            selectStudent={this.props.func.onSelectStudent}
            student={this.props.student}
          />
        );
      default:
        return "";
    }
  };

  // RENDER COMPONENT

  render() {
    const allStudents = this.props.students.map(student => {
      return (
        <div key={student._id}>
          <Student
            student={student}
            func={this.props.studentFunctions}
            // studentNameCallback={() => this.studentNameCallback(student)}
          />
        </div>
      );
    });

    return (
      <div>
        <div>
          {/* <AddStudent
            onAddStudent={this.onAddStudent}
            onEnterName={this.onEnterName}
            newStudent={this.state.newStudent}
            className="student_add btn btn-primary"
          /> */}
          {/* Add Student
        </button> */}
        </div>
        <div className="students">{allStudents}</div>
      </div>
    );
  }
}

StudentList.propTypes = {
  customerNameCallbackCustomers: PropTypes.func
};

export default Dashboard;
