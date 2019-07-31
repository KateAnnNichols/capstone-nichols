import React from "react";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Navbar = props => {
  // const redirecter = () => {
  //   props.history.push(`stickers`)
  // }

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-bg justify-content-center">
      <h1 className="App-title">
        <img
          src={
            "https://i.ibb.co/0f83Kyv/Screen-Shot-2019-07-25-at-5-56-37-PM.png"
          }
          className="App-title"
          alt="Sticker Star"
        />
      </h1>
      <div
        className="nav navbar-nav nav-fill justify-content-between"
        id="navbarSupportedContent"
      >
        <div className="nav-item px-3">
          <button
            onClick={props.onToggleSound}
            className="nav-link btn btn-color font-face"
          >
            sound {props.pageSound ? "on" : "off"}
          </button>
        </div>
        <div className="nav-item px-3">
          <button
            onClick={props.onToggleAnimation}
            className="nav-link btn btn-color font-face"
          >
            animation {props.pageAnimation ? "on" : "off"}
          </button>
        </div>
        <div className="nav-item px-3">
          <a href="/stickers" className="nav-link btn btn-color font-face">
            choose sticker
          </a>
        </div>
        <div className="nav-item px-3">
          <a href="/rewards" className="nav-link btn btn-color font-face">
            choose reward
          </a>
        </div>
        <div className="nav-item px-3">
          <button
            onClick={props.onClearBoard}
            className="nav-link btn btn-color font-face"
          >
            new board
          </button>
        </div>
        <div className="nav-item px-3">
          <a href="/home" className="nav-link btn btn-color btn-font font-face">
            my students
          </a>
        </div>
        <div className="nav-item px-3">
          <button
            onClick={props.onLogout}
            className="nav-link btn btn-color font-face"
          >
            log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
