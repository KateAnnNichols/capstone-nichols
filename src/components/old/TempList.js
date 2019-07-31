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
            newStudent: "Enter name",
            students: []
        };
    }

    getStudents = () => {
        axios
            .get("/students")
            .then(res => {
                console.log(res);
                this.setState(state => ({ students: res.data }));
            })
            .then(console.log("Retrieving students"))
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getStudents();
    }

    onEnterName = event => {
        const name = event.target.value.trim();
        this.setState(state => ({ newStudent: name }));
    };

    onAddStudent = event => {
        event.preventDefault();
        if (this.state.newStudent) {
            const student = {
                name: this.state.newStudent,
                teacher: this.props.user.name
            };
            console.log(student);
            axios
                .post("/students/", student)
                .then(res => {
                    console.log(res.data);
                })
                .then(this.getStudents())
                .then(this.setState(state => ({ newStudent: "Enter name" })))
                .catch(err => console.log(err));
        } else {
            alert("Please enter student name");
        }
    };

    render(routerprops) {
        const allStudents = this.state.students.map((student, idx) => {
            console.log(student);
            return (
                <Student
                    {...routerprops}
                    key={idx}
                    student={student}
                    select={this.props.select}
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
            newName: "New name"
        };
    }

    onCancel = () => {
        this.setState(state => ({ detail: "blank" }));
    };

    // EDIT NAME
    onChangeName = event => {
        const name = event.target.value.trim();
        console.log(name);
        this.setState(state => ({ newName: name }));
    };

    onEditStudentName = event => {
        event.preventDefault();
        if (this.state.newName) {
            const id = this.props.student._id;
            const student = Object.assign({}, this.props.student, {
                name: this.state.newName
            });
            console.log(student);
            axios
                .put("/students/" + id, student)
                .then(res => {
                    console.log(res.data);
                })
                .then(this.props.getStudents())
                .then(
                    this.setState(state => ({
                        detail: "blank",
                        newName: "Enter name"
                    }))
                )
                .then(this.props.func.return())
                .catch(err => console.log(err));
        } else {
            alert("Please enter student name.");
        }
    };

    // DELETE STUDENT
    onDeleteStudent = () => {
        const id = this.props.student._id;
        console.log(this.props.student.name, this.props.student._id);
        axios
            .delete("/students/" + id)
            .then(res => {
                console.log(res.data.status);
            })
            .then(this.props.getStudents())
            .then(this.onCancel())
            .catch(err => console.log(err));
    };

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
                {/* <div className="student__content-name">{this.props.student.name}</div>
        {/* </span> */}
                {/* <div>{this.studentOption()}</div> */}
                <div>
                    {/* <span className="nav-item px-5">
            <button
              onClick={this.select}
              className="student__content-name">{this.props.student.name}
              {this.studentOption()}
            </button>
          </span>
 */}


                    <span className="nav-item px-5">
                        <button
                            onClick={this.select}
                            className="student__select btn btn-solid btn-spaced font-face"
                        >
                            {this.props.student.name}
                            {this.studentOption()}
                        </button>
                    </span>
                    <span className="nav-item px-5">
                        <button
                            onClick={this.stats}
                            className="student__stats btn btn-solid btn-spaced font-face"
                        >
                            History
            </button>
                    </span>
                    <span className="nav-item px-5">
                        <button
                            onClick={this.edit}
                            className="student__edit btn btn-solid btn-spaced font-face"
                        >
                            Edit
            </button>
                    </span>
                    <span className="nav-item px-5">
                        <button
                            onClick={this.del}
                            className="student__delete btn btn-solid font-face"
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

