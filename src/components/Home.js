import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import "../App.css";
// import * as API from "../helpers/API";
import axios from "axios";
import Navbar from "./Navbar";
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
      boardActive: false,
      boardCompleted: false,
      studentActive: false,
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
      stickersPlaced: 0
    };
    this.onPlaceSticker = this.onPlaceSticker.bind(this);
    this.chooseStudent = this.chooseStudent.bind(this);
    // this.onClearBoard = this.onClearBoard.bind(this);
    // this.onLeaveStudent = this.onLeaveStudent.bind(this);
    // this.onStayBoard = this.onStayBoard.bind(this);
    this.chooseSticker = this.chooseSticker.bind(this);
    this.chooseReward = this.chooseReward.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.startBoard = this.startBoard.bind(this);
    this.checkBoard = this.checkBoard.bind(this);
    this.checkStudent = this.checkStudent.bind(this);
    this.restart = this.restart.bind(this);
  }

  async componentDidMount() {
    await this.props.getUser();
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

  chooseStudent = id => {
    axios
      .put("/students/" + id)
      .then(res => {
        console.log(res.data);
        this.setState(state => ({
          boardActive: true,
          studentActive: true,
          stickersPlaced: 0,
          student: res.data
        }));
        console.log(this.state);
      })
      .then(console.log(this.state.student))
      .then(this.props.history.push("/home/board"))
      .catch(err => console.log(err));
  };

  // onClearBoard() {
  //   this.setState(prevState => ({
  //     // student: {
  //   _id: "",
  //   name: "",
  //   teacher: "",
  //   boardsCompletedByDate: []
  // },
  // boardActive: !prevState.boardActive
  // boardActive: false
  // studentActive: false
  // }));
  // this.props.history.push("/home/board");
  // this.props.history.push("/home");
  // }

  // onLeaveStudent() {
  //   this.setState(state => ({ student: {}, studentActive: false }));
  //   this.props.history.push("/home");
  // }

  // onStayBoard() {
  //   this.setState(state => ({ boardActive: true }));
  //   this.props.history.push("/home/board");
  // }

  async resetBoard() {
    await this.setState(state => ({
      boardCompleted: false
    }));
  }

  async startBoard() {
    await this.setState(state => ({ boardActive: true }));
  }

  async updateStickers() {
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
      await this.setState(state => ({
        boardCompleted: true,
        stickersPlaced: 0
      }));
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

  async addBoardToStats() {
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
    await this.setState({ student: student });
    console.log(this.state.student);
  }

  // CONDITIONAL RENDERING
  checkBoard = (boardActive, studentActive) => {
    // const studentActive = this.state.studentActive;
    // const boardActive = this.state.boardActive;
    if (!studentActive) {
      return <SelectStudent />;
    } /*if (!boardActive && studentActive)*/ else {
      // this.setState(state => ({ boardActive: true }));
      // this.startBoard();
      return (
        <StickerBoard
          // {...routerprops}
          // boardActive={this.boardActive}
          boardActive={true}
          boardCompleted={this.state.boardCompleted}
          onPlaceSticker={this.onPlaceSticker}
          pageAnimation={this.state.pageAnimation}
          resetBoard={this.resetBoard}
          reward={this.state.reward}
          stickersPlaced={this.state.stickersPlaced}
          sticker={this.state.sticker}
          student={this.state.student}
          studentActive={this.state.studentActive}
        />
      );
    }
  };

  ifBoard = state => {
    // if (this.state) {
    console.log(this.state.boardActive, this.state.studentActive);
    return this.checkBoard(this.state.boardActive, this.state.studentActive);
    // } else {
    //   return "";
    // }
  };

  // ifBoard = this.checkBoard();

  async restart(state) {
    await this.setState(state => ({
      boardActive: false,
      boardCompleted: false,
      stickersPlaced: 0,
      student: {},
      studentActive: false
    }));
  }

  checkStudent(state, props) {
    const studentActive = this.state.studentActive;
    const boardActive = this.state.boardActive;
    if (studentActive || boardActive) {
      return (
        <AskToClear
          restart={this.restart}
          // stay={this.push.history.location(`home/board`)}
        />
      );
    } else {
      return (
        <StudentList
          // {...routerprops}
          // clear={this.onClearBoard}
          boardActive={this.state.boardActive}
          user={this.props.user}
          tag={this.props.tag}
          getUser={this.props.getUser}
          select={this.chooseStudent}
          student={this.state.student}
        />
      );
    }
  }

  ifStudent = (state, props) => {
    // if (this.state) {
    console.log(this.state.boardActive, this.state.studentActive);
    return this.checkStudent(this.state, this.props);
    // } else {
    //   return "";
    // }
  };

  // ifStudent = this.checkStudent(
  //   this.state.boardActive,
  //   this.state.studentActive
  // );

  // toStickers = () => this.props.history.push(`/home/stickers`);

  // toRewards = () => this.props.history.push(`/home/rewards`);

  // toBoard = () => this.props.history.push(`/home/boards`);

  // toHome = () => this.props.history.push(`/`);

  // game = (boardActive, studentActive) => {
  //   if (!studentActive) {
  //     return <ChooseStudent />;
  //   } else if (!boardActive && studentActive) {
  //     return <AskToClear clear={this.onLeaveStudent} stay={this.onStayBoard} />;
  //   } else {
  //     return (
  //       <StickerBoard
  //         // {...routerprops}
  //         // boardActive={this.boardActive}
  //         boardActive={true}
  //         boardCompleted={this.state.boardCompleted}
  //         onPlaceSticker={this.onPlaceSticker}
  //         pageAnimation={this.state.pageAnimation}
  //         resetBoard={this.resetBoard}
  //         reward={this.state.reward}
  //         stickersPlaced={this.state.stickersPlaced}
  //         sticker={this.state.sticker}
  //         student={this.state.student}
  //         studentActive={this.state.studentActive}
  //       />
  //     );
  //   }
  //   // else {
  //   //   return <AskToClear clear={this.onClearBoard} />;
  //   // }
  // };

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

  render() {
    console.log(this.state.stickers, stickerData);
    console.log("In progress: " + this.state.boardActive);
    console.log("Current student: " + this.state.student._id);
    console.log("Current teacher: " + this.props.user.name);
    console.log("Logged in: " + this.props.isLoggedIn);
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
          // onClearBoard={this.onClearBoard}
          onLogout={this.props.onLogout}
          onToggleAnimation={this.onToggleAnimation}
          onToggleSound={this.onToggleSound}
          pageAnimation={this.state.pageAnimation}
          pageSound={this.state.pageSound}
          board={this.toBoard}
          resetBoard={this.resetBoard}
          home={this.toHome}
          rewards={this.toRewards}
          stickers={this.toStickers}
        />
        <div className="main">
          <Route
            exact
            path="/home"
            render={() => <div>{this.ifStudent()}</div>}
            // tag for default?
            // render={routerprops => (
            //   <StudentList
            //     {...routerprops}
            //     clear={this.onClearBoard}
            //     boardActive={this.state.boardActive}
            //     user={this.props.user}
            //     tag={this.props.tag}
            //     select={this.chooseStudent}
            //     student={this.state.student}
            //   />
            // )}
          />
          <Route
            exact
            path={`${match.url}/board`}
            render={() => <div>{this.ifBoard()}</div>}
          />
          <Route
            exact
            path={`${match.url}/stickers`}
            render={() => (
              <Stickers
                choose={this.chooseSticker}
                stickers={stickerData}
                boardActive={this.state.boardActive}
                studentActive={this.state.studentActive}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/rewards`}
            render={() => (
              <Rewards
                choose={this.chooseReward}
                rewards={rewardData}
                boardActive={this.state.boardActive}
                studentActive={this.state.studentActive}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
