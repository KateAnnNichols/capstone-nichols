import React, { Component } from "react";
import "../App.css";

// {
/* <div class="row">
  <div class="col-md-6 mx-auto">
    <div class="card card-body">
      <img class="logo" src="/img/logo.png" alt="">
      <h3 class="text-center">Account Login</h3>
      <form action="/teachers/login" method="post">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" class="form-control" required>
        </div>
         <div class="form-group">
          <label for="password">Password</label>
          <input type="password" name="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div> */
// }

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 4 && this.state.password.length > 4;
  }

  async handleChange(event) {
    await this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      await this.props.onLogin({
        name: this.state.username,
        password: this.state.password
      });
    } else {
      alert("Fields must be longer than 4 characters");
    }
  }

  render() {
    return (
      <div className="Login">
        {/* <h2>Welcome to Sticker Star!</h2> */}
        <div className="login-logo">
          <img
            className="login-logo"
            src={
              "https://i.ibb.co/0f83Kyv/Screen-Shot-2019-07-25-at-5-56-37-PM.png"
            }
            alt="Sticker Star"
          />
        </div>
        {/* <h3>Ready for some fun?</h3> */}
        <form
          onSubmit={this.handleSubmit}
          className="student__select btn btn-solid btn-spaced font-face"
        >
          <fieldset>
            <legend>Login:</legend>
            <label>Username:</label>
            <input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
            <input type="submit" value="Sign Up" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
