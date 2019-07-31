import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
// import * as API from "./helpers/API";
import Home from "./components/Home2";
// import Login from "./components/Login";
import "./App.css";
import Profile from "./components/Profile";
// import Landing from "./components/Landing";
// import PrivateRoute from "./components/PrivateRoute";
// import { useAuth0 } from "../react-auth0-wrapper";
//import PropTypes from "prop-types";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      students: [],
      tag: "",
      user: {
        name: "dongo",
        email: "dongo@dongo.com",
        password: "dongo",
        passwordConfirmation: "dongo"
      }
    };
  }

  // onLogin = user => {
  //   this.setState({ user: user });
  //   API.loginTeacher(user)
  //     .then(this.setState({ isLoggedIn: true }))
  //     .then(console.log("User logged in"));
  // };

  // onLogout = () => {
  //   API.logoutTeacher().then(
  //     this.setState({
  //       isLoggedIn: false,
  //       user: {
  //         name: "",
  //         email: "",
  //         password: "",
  //         passwordConfirmation: ""
  //       }
  //     }).then(console.log("User logged out"))
  //   );
  // };

  // onSignup = user => {
  //   this.setState({ user: user });
  //   API.addTeacher(user)
  //     .then(this.setState({ isLoggedIn: true }))
  //     .then(console.log("User logged in"));
  // };

  render() {
    // const { isAuthenticated, loginWithPopup, logout, user } = useAuth0();
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={() => <Redirect to="/home" />}
            // ) : (
            // <Redirect to="/login" />
            // )
          />
          {/* <Route exact path="/profile" component={Profile} /> */}
          <Route exact path="/home" render={() => <Home />} />
          {/* <Route exact path="/login" component={Landing} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
