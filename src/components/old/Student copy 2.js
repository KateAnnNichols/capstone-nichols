import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// import { StudentExpand } from "./StudentOptions";
// import Add from "./Add";
// import Detail from "./Detail";
import { withRouter } from "react-router";
import Delete from "./Delete";
import Edit from "./Edit";
import Select from "./Select";
import Stats from "./Stats";
// import EditForm from "./EditForm";
// import PropTypes from "prop-types";
// import CustomerStyles from './Customer.css';

class Student extends Component {
  constructor(props) {
    super(props);
    // let match = props.match;
  }

  render() {
    console.log(this.props.match);
    let match = this.props.match;
    return this.props.student ? (
      <div className="student">
        <Route
          path={`${match.url}/delete`}
          render={() => (
            <Delete
              selectStudent={this.props.func.onSelectStudent}
              deleteStudent={this.props.func.onDeleteStudent}
              student={this.props.student}
            />
          )}
        />
        <Route
          path={`${match.url}/edit`}
          render={() => (
            <Edit
              selectStudent={this.props.func.onSelectStudent}
              editStudent={this.props.func.onEditStudent}
              student={this.props.student}
            />
          )}
        />
        <Route
          path={`${match.url}/select`}
          render={() =>
            withRouter(
              <Select
                selectStudent={this.props.func.onSelectStudent}
                student={this.props.student}
              />
            )
          }
        />
        <Route
          path={`${match.url}/stats`}
          render={
            () => "HI friends!"
            // <Stats
            //   selectStudent={this.props.func.onSelectStudent}
            //   student={this.props.student}
            // />
          }
        />{" "}
        {/* <span className="student__content"> */}
        <div className="student__content-name">{this.props.student.name}</div>
        {/* </span> */}
        {/* <div>{this.studentOption()}</div> */}
        <div>
          <span className="nav-item px-5">
            <Link
              to={`${match.url}/select`}
              className="student__select btn btn-primary"
            >
              Select
            </Link>
            {/* onClick={this.select}
              className="student__select btn btn-primary"
            >
              Select
            </button> */}
          </span>
          <span className="nav-item px-5">
            <Link
              to={`${match.url}/stats`}
              className="student__stats btn btn-primary"
            >
              History
            </Link>
          </span>
          <span className="nav-item px-5">
            <Link
              to={`${match.url}/edit`}
              className="student__edit btn btn-primary"
            >
              Edit
            </Link>
          </span>
          <span className="nav-item px-5">
            <Link
              to={`${match.url}/delete`}
              className="student__delete btn btn-primary"
            >
              Delete
            </Link>
          </span>
        </div>
        {/* <Route
          path={`${match.url}/delete`}
          render={() => (
            <Delete
              selectStudent={this.props.func.onSelectStudent}
              deleteStudent={this.props.func.onDeleteStudent}
              student={this.props.student}
            />
          )}
        />
        <Route
          path={`${match.url}/edit`}
          render={() => (
            <Edit
              selectStudent={this.props.func.onSelectStudent}
              editStudent={this.props.func.onEditStudent}
              student={this.props.student}
            />
          )}
        />
        <Route
          path={`${match.url}/select`}
          render={() => (
            <Select
              selectStudent={this.props.func.onSelectStudent}
              student={this.props.student}
            />
          )}
        />
        <Route
          path={`${match.url}/stats`}
          render={() =>
            "HI friends!"
            // <Stats
            //   selectStudent={this.props.func.onSelectStudent}
            //   student={this.props.student}
            // />
          }
        /> */}
      </div>
    ) : (
      <div>"No students found."</div>
    );
  }
}

// Student.propTypes = {
//   id: PropTypes.number,
//   name: PropTypes.string,
//   studentNameCallback: PropTypes.func
// };

export default withRouter(Student);
