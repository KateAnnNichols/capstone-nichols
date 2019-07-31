import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Delete from "./Delete";
import Edit from "./Edit";
import Select from "./Select";
import Stats from "./Stats";
// import PropTypes from "prop-types";
// import CustomerStyles from './Customer.css';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: "blank",
      newName: ""
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.onEditStudentName = this.onEditStudentName.bind(this);
    this.onDeleteStudent = this.onDeleteStudent.bind(this);
  }

  onCancel = () => {
    this.setState(state => ({ detail: "blank" }));
  };

  // EDIT NAME
  onChangeName = event => {
    const name = event.target.value;
    console.log(name);
    this.setState(state => ({ newName: name }));
  };

  async updateStudent(student) {
    const id = this.props.student._id;
    await axios.put("/students/" + id, student).then(res => {
      console.log(res.data);
    });
  }

  async onEditStudentName(event, state) {
    event.preventDefault();
    console.log(this.state);
    if (this.state.newName) {
      const student = Object.assign({}, this.props.student, {
        name: this.state.newName
      });
      console.log(student);
      await this.updateStudent(student);
      // axios
      //   .put("/students/" + id, student)
      //   .then(res => {
      //     console.log(res.data);
      //   })
      await this.props.getStudents();
      this.setState(state => ({
        detail: "blank",
        newName: "Enter name"
      }));
      // )
      // .then(this.props.func.return())
      // .catch(err => console.log(err));
    } else {
      alert("Please enter student name.");
    }
  }

  // DELETE STUDENT
  // deleteAPI = () => {
  //   const id = this.props.student._id;
  //   axios.delete("/students/" + id).then(res => {
  //     console.log(res.data.status);
  //   });
  // };

  async onDeleteStudent() {
    console.log(this.props.student.name, this.props.student._id);
    const id = this.props.student._id;
    await axios.delete("/students/" + id).then(res => {
      console.log(res.data.status);
    });
    // await this.deleteAPI();
    // axios
    //   .delete("/students/" + id)
    //   .then(res => {
    //     console.log(res.data.status);
    //   })
    this.props.getStudents(this.props.user);
    this.onCancel();
  }

  // SELECT STUDENT
  startBoard = () => {
    this.props.select(this.props.student._id);
  };

  // CONDITIONAL RENDERING

  add = state => {
    this.setState(state => ({ detail: "add" }));
  };

  del = state => {
    this.setState(state => ({ detail: "del" }));
  };

  edit = state => {
    this.setState(state => ({ detail: "edit" }));
  };

  select = state => {
    this.setState(state => ({ detail: "select" }));
  };

  stats = state => {
    this.setState(state => ({ detail: "stats" }));
  };

  onDisplay = (state, props, routerprops) => {
    switch (state) {
      case "blank":
        return "";
      case "del":
        return (
          <Delete
            deleteStudent={this.onDeleteStudent}
            student={this.props.student}
            cancel={this.onCancel}
          />
        );
      case "edit":
        return (
          <Edit
            editStudent={this.onEditStudentName}
            changeName={this.onChangeName}
            student={this.props.student}
            newName={this.state.newName}
            cancel={this.onCancel}
          />
        );
      case "select":
        return (
          <Select
            {...routerprops}
            select={this.startBoard}
            student={this.props.student}
            cancel={this.onCancel}
          />
        );
      case "stats":
        return <Stats student={this.props.student} cancel={this.onCancel} />;
      default:
        return "";
    }
  };

  studentOption = (state, props) => {
    if (this.state.detail) {
      return this.onDisplay(this.state.detail, this.props);
    } else {
      return "";
    }
  };

  // RENDER COMPONENT

  render() {
    return (
      <div className="student">
        {/* <span className="student__content"> */}
        {/* <div className="student__content-name">{this.props.student.name}</div> */}
        {/* </span> */}
        <div className="student__option btn btn-solid btn-spaced font-face">
          {this.studentOption()}
        </div>
        <div>
          <span className="nav-item px-5">
            <button
              onClick={this.select}
              className="student__select btn btn-solid btn-spaced font-face"
            >
              {this.props.student.name}
              {/* {this.studentOption()} */}
            </button>
          </span>
          <span className="nav-item px-5">
            <button
              onClick={this.stats}
              className="student__select btn btn-solid btn-spaced font-face"
            >
              History
            </button>
          </span>
          <span className="nav-item px-5">
            <button
              onClick={this.edit}
              className="student__select btn btn-solid btn-spaced font-face"
            >
              Edit
            </button>
          </span>
          <span className="nav-item px-5">
            <button
              onClick={this.del}
              className="student__select btn btn-solid btn-spaced font-face"
            >
              Delete Student
            </button>
          </span>
        </div>
      </div>
    );
  }
}

// Student.propTypes = {
//   id: PropTypes.number,
//   name: PropTypes.string,
//   studentNameCallback: PropTypes.func
// };

export default Student;
