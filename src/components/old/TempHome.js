import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import "../App.css";
// import * as API from "../helpers/API";
import axios from "axios";
import Navbar from "./Navbar";
import ChooseStudent from "./ChooseStudent";
import AskToClear from "./AskToClear";
import SelectedInfo from "./SelectedInfo";
import StudentList from "./StudentList";
import StickerBoard from "./StickerBoard";
import isSameDay from "date-fns/is_same_day";
import { format } from "date-fns";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        _id: "",
        name: "",
        teacher: "",
        boardsCompletedByDate: []
      },
      boardInProgress: false,
      studentLoaded: false,
      pageAnimation: true,
      pageSound: true,
      // does this go in StickerBoard?
      stickersPlaced: 0
    };
    this.onPlaceSticker = this.onPlaceSticker.bind(this);
    this.onSelectStudent = this.onSelectStudent.bind(this);
    this.onClearBoard = this.onClearBoard.bind(this);
  }

  onToggleAnimation = () => {
    this.setState(state => ({
      pageAnimation: !this.state.pageAnimation
    }));
    console.log(this.state.pageAnimation);
  };

  onToggleSound = () => {
    this.setState(state => ({
      pageSound: !this.state.pageSound
    }));
    console.log(this.state.pageSound);
  };

  onSelectStudent = id => {
    axios
      .put("/students/" + id)
      .then(res => {
        console.log(res.data);
        this.setState(state => ({
          boardInProgress: true,
          studentLoaded: true,
          stickersPlaced: 0,
          student: res.data
        }));
        console.log(this.state);
      })
      .then(console.log(this.state.student))
      .then(this.props.history.push("/home/board"))
      .catch(err => console.log(err));
  };

  onClearBoard() {
    this.setState(prevState => ({
      // student: {
      //   _id: "",
      //   name: "",
      //   teacher: "",
      //   boardsCompletedByDate: []
      // },
      boardInProgress: !prevState.boardInProgress
      // boardInProgress: false
      // studentLoaded: false
    }));
    this.props.history.push("/home/board");
  }

  onPlaceSticker() {
    // UI.changeBoard();
    console.log(this.state.stickersPlaced);
    this.setState(prevState => ({
      stickersPlaced: prevState.stickersPlaced + 1
    }));
    if (this.state.stickersPlaced === 3) {
      this.addBoardToStats();
      // UI.celebrate();
      this.setState(state => ({ stickersPlaced: 0 }));
      axios
        .put("/students/" + this.state.student._id, this.state.student)
        .then(res => {
          console.log(res.data);
        })
        .then(
          console.log(
            `Boards completed = ${this.state.student.boardsCompleted}`
          )
        );
    }
  }

  addBoardToStats() {
    const student = Object.assign({}, this.state.student);
    const boards = student.boardsCompletedByDate;
    const currentBoard = boards[boards.length - 1];
    console.log(currentBoard);
    const today = format(Date.now(), "MM/DD/YYYY");
    if (!currentBoard) {
      student.boardsCompletedByDate.push({ day: today, boardsCompleted: 1 });
    } else if (isSameDay(currentBoard.day, today)) {
      console.log("same day");
      currentBoard.boardsCompleted += 1;
    } else {
      student.boardsCompletedByDate.push({ day: today, boardsCompleted: 1 });
    }
    console.log(student.boardsCompletedByDate);
    this.setState({ student: student });
    console.log(this.state.student);
  }

  // CONDITIONAL RENDERING
  game = (inProgress, withStudent) => {
    if (!inProgress && !withStudent) {
      return <ChooseStudent />;
    } else if (inProgress && withStudent) {
      return (
        <StickerBoard
          // {...routerprops}
          // boardInProgress={this.boardInProgress}
          onPlaceSticker={this.onPlaceSticker}
          stickersPlaced={this.state.stickersPlaced}
          student={this.state.student}
        />
      );
    } else {
      return <AskToClear clear={this.onClearBoard} />;
    }
  };

  gameBoard = state =>
    this.game(this.state.boardInProgress, this.state.studentLoaded);

  render() {
    console.log("In progress: " + this.state.boardInProgress);
    console.log("Current student: " + this.state.student._id);
    let match = this.props.match;
    return (
      <div>
        {/* <header className="App-header"> */}
        {/* <img
            src={
              "https://i.ibb.co/6PZqtHk/Screen-Shot-2019-07-19-at-11-22-08-AM.png"
            }
            className="App-logo"
            alt="chalkboard"
          /> */}
        {/* <h1 className="App-title">
            <img
              src={
                "https://i.ibb.co/0f83Kyv/Screen-Shot-2019-07-25-at-5-56-37-PM.png"
              }
              className="App-title"
              alt="Sticker Star"
            />
          </h1> */}
        {/* <SelectedInfo
            student={this.state.student}
            teacher={this.props.user}
          /> */}
        {/* </header> */}
        <Navbar
          onClearBoard={this.onClearBoard}
          onLogout={this.onLogout}
          onToggleAnimation={this.onToggleAnimation}
          onToggleSound={this.onToggleSound}
          pageAnimation={this.state.pageAnimation}
          pageSound={this.state.pageSound}
        />
        <div>
          <Route
            exact
            path="/home"
            // tag for default?
            render={routerprops => (
              <StudentList
                {...routerprops}
                clear={this.onClearBoard}
                boardInProgress={this.state.boardInProgress}
                user={this.props.user}
                tag={this.props.tag}
                select={this.onSelectStudent}
                student={this.state.student}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/board`}
            render={() => <div>{this.gameBoard()}</div>}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
