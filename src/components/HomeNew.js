import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import "../App.css";
// import * as API from "../helpers/API";
import axios from "axios";
import Navbar from "./NavbarNew";
import SelectStudent from "./SelectStudent";
import AskToClear from "./AskToClear";
// import SelectedInfo from "./SelectedInfo";
import StudentList from "./StudentList";
import StickerBoard from "./StickerBoard";
import Stickers from "./Stickers";
import Rewards from "./Rewards";
import soundFile from "../tada.mp3";
import { stickerData } from "./stickerData";
import { rewardData } from "./rewardData";
import isSameDay from "date-fns/is_same_day";
import { format } from "date-fns";
import confetti from "canvas-confetti";

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
      sticker: {
        src: "https://i.ibb.co/b2wZDqL/61-Ez-ZBx-ZN2-L-SX425.jpg",
        alt: "star"
      },
      reward: {
        src: "https://i.ibb.co/rvtygSG/images.png",
        alt: "great job"
      },
      stickersToChoose: stickerData,
      rewardsToChoose: rewardData,
      // does this go in StickerBoard?
      stickersPlaced: 0
      // allStickers: stickerData
    };
    this.onPlaceSticker = this.onPlaceSticker.bind(this);
    this.onSelectStudent = this.onSelectStudent.bind(this);
    this.onClearBoard = this.onClearBoard.bind(this);
    this.onLeaveStudent = this.onLeaveStudent.bind(this);
    this.onStayBoard = this.onStayBoard.bind(this);
    this.chooseSticker = this.chooseSticker.bind(this);
    this.chooseReward = this.chooseReward.bind(this);
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
      // boardInProgress: !prevState.boardInProgress
      boardInProgress: false
      // studentLoaded: false
    }));
    // this.props.history.push("/home/board");
    // this.props.history.push("/home");
  }

  onLeaveStudent() {
    this.setState(state => ({ student: {}, studentLoaded: false }));
    this.props.history.push("/home");
  }

  onStayBoard() {
    this.setState(state => ({ boardInProgress: true }));
    this.props.history.push("/home/board");
  }

  updateStickers() {
    var duration = 1.5 * 1000;
    var end = Date.now() + duration;

    if (this.state.stickersPlaced === 3) {
      if (this.state.pageAnimation) {
        (function frame() {
          // launch a few confetti from the left edge
          confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          // and launch a few from the right edge
          confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
          // keep going until we are out of time
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }
      this.addBoardToStats();
      console.log(this.state.student.boardsCompletedByDate);
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

  async resetBoard() {
    await this.setState(state => ({ boardCompleted: false }));
  }

  async onPlaceSticker() {
    // UI.changeBoard();
    if (this.state.pageSound) {
      const audio = new Audio(soundFile);
      await audio.play();
    }
    console.log(this.state.stickersPlaced);
    await this.setState(prevState => ({
      stickersPlaced: prevState.stickersPlaced + 1
    }));
    console.log(this.state.stickersPlaced);
    this.updateStickers();
    // if (this.state.stickersPlaced === 3) {
    //   this.addBoardToStats();
    //   console.log(this.state.student.boardsCompletedByDate);
    //   // UI.celebrate();
    //   this.setState(state => ({ stickersPlaced: 0 }));
    //   axios
    //     .put("/students/" + this.state.student._id, this.state.student)
    //     .then(res => {
    //       console.log(res.data);
    //     })
    //     .then(
    //       console.log(
    //         `Boards completed = ${this.state.student.boardsCompleted}`
    //       )
    //     );
    // }
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
    if (!withStudent) {
      return <SelectStudent />;
    } else if (!inProgress && withStudent) {
      return <AskToClear clear={this.onLeaveStudent} stay={this.onStayBoard} />;
    } else {
      return (
        <StickerBoard
          // {...routerprops}
          // boardInProgress={this.boardInProgress}
          boardInProgress={true}
          onPlaceSticker={this.onPlaceSticker}
          reset={this.resetBoard}
          reward={this.state.reward}
          stickersPlaced={this.state.stickersPlaced}
          sticker={this.state.sticker}
          student={this.state.student}
        />
      );
    }
    // else {
    //   return <AskToClear clear={this.onClearBoard} />;
    // }
  };

  async chooseSticker(event) {
    const alt = event.target.alt;
    console.log(alt);
    const stickersToChoose = [...this.state.stickersToChoose];
    // const stickers = [...this.state.stickers];
    // console.log(stickers);
    // if (stickers.length === 3) {
    //   stickers.shift();
    // }
    const sticker = stickersToChoose.filter(sticker => sticker.alt === alt)[0];
    // console.log(sticker);
    // stickers.push(sticker);
    await this.setState(state => ({ sticker: sticker }));
    console.log(this.state.stickers);
  }

  async chooseReward(event) {
    const alt = event.target.alt;
    const rewardsToChoose = [...this.state.rewardsToChoose];
    const reward = rewardsToChoose.filter(reward => reward.alt === alt)[0];
    this.setState(state => ({ reward: reward }));
    console.log(this.state.reward);
  }

  gameBoard = state =>
    this.game(this.state.boardInProgress, this.state.studentLoaded);

  render() {
    console.log(this.state.stickers, stickerData);
    console.log("In progress: " + this.state.boardInProgress);
    console.log("Current student: " + this.state.student._id);
    let match = this.props.match;
    return (
      <div className="Home">
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
        <div className="main">
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
          <Route
            exact
            path={`${match.url}/stickers`}
            render={() => (
              <Stickers
                choose={this.chooseSticker}
                stickers={stickerData}
                boardInProgress={this.state.boardInProgress}
                board={this.onStayBoard}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/rewards`}
            render={() => (
              <Rewards choose={this.chooseReward} rewards={rewardData} />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
