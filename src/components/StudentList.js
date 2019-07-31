// Page provides info on students belonging to teacher, and options to CRUD students
// GETS all <Student>s with teacherName matching logged in teacher
// Maps all <Student>s into list of components
// Passes up props of selected student to <Home>, for SelectedInfo
//

import React, { Component } from "react";
// import * as API from "../helpers/API";
import { withRouter } from "react-router";
import Add from "./Add";
import axios from "axios";
import Student from "./Student";
// import PropTypes from "prop-types";
// import './CustomerList.css';

class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newStudent: "",
      students: []
    };
    this.onAddStudent = this.onAddStudent.bind(this);
    this.getStudents = this.getStudents.bind(this);
  }

  async getStudents() {
    const user = this.props.user;
    console.log(user.name);
    await axios.put("/students/teacher", { teacher: user.name }).then(res => {
      console.log(res);
      this.setState(state => ({ students: res.data }));
    });
    console.log("Retrieving students");
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.getStudents();
  }

  // shouldComponentMount(nextState) {
  //   return this.state.students.length !== nextState.students.length;
  // }

  onEnterName = event => {
    const name = event.target.value;
    this.setState(state => ({ newStudent: name }));
    console.log(this.state.newStudent);
  };

  async onAddStudent(event) {
    event.preventDefault();
    // const user = localStorage.getItem("user") || this.props.user;
    if (this.state.newStudent) {
      const student = {
        name: this.state.newStudent,
        teacher: this.props.user.name
      };
      console.log(student);
      await axios.post("/students/", student).then(res => {
        console.log(res.data);
      });
      await this.getStudents();
      this.setState(state => ({ newStudent: "" }));
      // .catch(err => console.log(err));
    } else {
      alert("Please enter student name");
    }
  }

  render(routerprops) {
    const allStudents = this.state.students.map((student, idx) => {
      console.log(student);
      return (
        <Student
          {...routerprops}
          key={idx}
          student={student}
          select={this.props.select}
          user={this.props.user}
          getStudents={this.getStudents}
        />
      );
    });

    return (
      <div>
        <h2>My Students</h2>
        {this.state.students.length > 0 ? (
          <div>
            <div className="students">{allStudents}</div>
          </div>
        ) : (
          <div>"You have no students!"</div>
        )}
        <Add
          onAddStudent={this.onAddStudent}
          onEnterName={this.onEnterName}
          newStudent={this.state.newStudent}
          className="student_add btn btn-primary"
        />
      </div>
    );
  }
}

// StudentList.propTypes = {
//
// };

export default withRouter(StudentList);
