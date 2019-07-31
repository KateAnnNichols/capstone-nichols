import React from "react";
//import PropTypes from "prop-types";
import "../App.css";
import { useAuth0 } from "../react-auth0-wrapper";

const Landing = props => {
  const { isAuthenticated, loginWithPopup, logout, user } = useAuth0();

  return (
    <div>
      <img
        src={
          "https://i.ibb.co/0f83Kyv/Screen-Shot-2019-07-25-at-5-56-37-PM.png"
        }
        className="App-title"
        alt="Sticker Star"
      />
      {/* <p>Welcome to Sticker Star!</p> */}
      {/* <p>Let's have fun!</p> */}
      <button
        className="nav-link btn btn-color font-face"
        onClick={() => loginWithPopup({})}
      >
        Log in
      </button>
    </div>
  );
};

export default Landing;
