import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
// import * as API from "./helpers/API";
import Home from "./components/Home";
import Login from "./components/Login";
import "./App.css";
//import PropTypes from "prop-types";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async getUser() {
    let user = localStorage.getItem("sticker-star-user");
    if (!user || user.name === undefined) {
      user = this.state.user;
    }
    await this.setState(state => ({ isLoggedIn: true, user: user }));
  }

  async componentDidMount() {
    await this.getUser();
  }

  async onLogin(user) {
    await this.setState({ isLoggedIn: true, user: user });
    localStorage.setItem("sticker-star-user", user);
    console.log(`${this.state.user.name} logged in`);
  }

  async onLogout() {
    await this.setState({
      isLoggedIn: false,
      user: {}
    });
    localStorage.removeItem("sticker-star-user");
    this.props.history.push("/");
    console.log("User logged out");
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() =>
            this.state.isLoggedIn && this.state.user.name !== undefined ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/home"
          render={() =>
            this.state.isLoggedIn && this.state.user !== undefined ? (
              <Home
                isLoggedIn={this.props.isLoggedIn}
                getUser={this.getUser}
                onLogout={this.onLogout}
                user={this.state.user}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() =>
            this.state.user.name === undefined ? (
              <Login
                /*loggedIn={this.state.loggedIn}*/ onLogin={this.onLogin}
              />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
      </div>
    );
  }
}

export default withRouter(App);
