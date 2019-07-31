import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onSearchStudent = event => {
    // event.preventDefault()
    this.setState({
      name: event.target.value
    });
  };

  render() {
    return (
      <form action="/search" className="form-inline my-2 my-lg-0">
        <input
          name="query"
          value={this.state.name}
          onChange={this.onSearchStudent}
          className="form-control mr-sm-2"
          type="addEdit"
          placeholder="enter student name"
          aria-label="addEdit"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          submit
        </button>
      </form>
    );
  }
}

export default withRouter(SearchForm);
