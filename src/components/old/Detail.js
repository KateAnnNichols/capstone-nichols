import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
// import { StudentExpand } from "./StudentOptions";
// import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import Select from "./Select";
import Stats from "./Stats";

class Detail extends Component {
  constructor(props) {
    super(props);
    let match = this.props.match;
  }

  onDisplay = (match, props) => {
    switch (match) {
      case "del":
        return (
          <Delete
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

  render() {
    // console.log(this.props.match);
    return this.onDisplay(this.props.match.params.topicId, this.props);
  }
}

export default withRouter(Detail);
