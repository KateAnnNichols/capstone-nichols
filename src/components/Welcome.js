import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login("/");
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout("/");
  }

  render() {
    // if (this.state.authenticated === null) return null;
    // return this.state.authenticated ? (
    //   <button onClick={this.logout}>Logout</button>
    // ) : (
    //   <button onClick={this.login}>Login</button>
    // );
    return (
      <div>
        {this.state.authenticated !== null && (
          <div>
            <h1>Custom Login Page with Sign In Widget</h1>
            {this.state.authenticated && (
              <div>
                <p>Welcome back, {this.state.userinfo.name}!</p>
                <p>
                  You have successfully authenticated against your Okta org, and
                  have been redirected back to this application. You now have an
                  ID token and access token in local storage. Visit the{" "}
                  <a href="/profile">My Profile</a> page to take a look inside
                  the ID token.
                </p>
                <h3>Next Steps</h3>
                <p>
                  Currently this application is a stand-alone front end
                  application. At this point you can use the access token to
                  authenticate yourself against resource servers that you
                  control.
                </p>
                <p>
                  This sample is designed to work with one of our resource
                  server examples. To see access token authentication in action,
                  please download one of these resource server examples:
                </p>
                {/* <ul>
                  {resourceServerExamples.map(example => <li key={example.label}><a href={example.url}>{example.label}</a></li>)}
                </ul> */}
                <p>
                  Once you have downloaded and started the example resource
                  server, you can visit the <a href="/messages">My Messages</a>{" "}
                  page to see the authentication process in action.
                </p>
              </div>
            )}
            {!this.state.authenticated && (
              <div>
                <p>
                  If you&lsquo;re viewing this page then you have successfully
                  started this React application.
                </p>
                <p>
                  <span>This example shows you how to use the </span>
                  <a href="https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react">
                    Okta React Library
                  </a>
                  <span> and the </span>
                  <a href="https://github.com/okta/okta-signin-widget">
                    Okta Sign-In Widget
                  </a>
                  <span> to add the </span>
                  <a href="https://developer.okta.com/authentication-guide/implementing-authentication/implicit">
                    Implicit Flow
                  </a>
                  <span>
                    {" "}
                    to your application. This combination is useful when you
                    want to leverage the features of the Sign-In Widget,{" "}
                  </span>
                  <span>
                    {" "}
                    and the authentication helper components from the{" "}
                    <code>okta-react</code> module.
                  </span>
                </p>
                <p>
                  Once you have logged in you will be redirected through your
                  authorization server (the issuer defined in config) to create
                  a session for Single-Sign-On (SSO). After this you will be
                  redirected back to the application with an ID token and access
                  token. The tokens will be stored in local storage for future
                  use.
                </p>
                <button id="login-button" primary onClick={this.login}>
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Welcome);
