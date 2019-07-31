import React, { Component } from "react";
// import PropTypes from "prop-types";
// import API from "../helpers/API.js";
// import Sticker from "./Sticker";
import Sticker from "./Sticker";
// import Stats from "./Stats";
// import Animation from "./Animation";
// import target from "../target.png";
import "./sticker.css";
import "../App.css";

class StickerBoard extends Component {
  // constructor(props) {
  //   super(props);
  // this.state = {
  //   targetSrc: target
  // };
  // }

  render() {
    //   console.log(this.props.stickers);
    //   const placedStickers = this.props.stickers.map((sticker, idx) => {
    //     return (
    //       <div key={idx}>
    //         <Sticker
    //           alt={sticker.alt}
    //           src={sticker.src}
    //           onClick={this.props.onPlaceSticker}
    //         />
    //       </div>
    //     );
    //   });

    const greeting = () => {
      // console.log(this.props.stickersPlaced);
      if (this.props.boardCompleted) {
        return <h2>Great job, {this.props.student.name}!</h2>;
      }
      return <h2>You can do it, {this.props.student.name}!</h2>;
    };

    // const reset = () => {
    //   if (this.props.boardCompleted) {
    //     return <button onClick={this.props.resetBoard}>Reset board</button>;
    //   }
    // };

    return (
      <div>
        {/* <button onClick={this.props.reset}>Reset Board</button> */}
        {greeting()}
        {/* <div className="temporary">
          <button onClick={this.props.onPlaceSticker}>Place Sticker</button>
          <p>Stickers Placed: {this.props.stickersPlaced}</p>
          <Stats student={this.props.student} />
        </div> */}
        <div className="stickerBoard">
          {/* <div className="stickers"> */}
          <Sticker
            stickerID="1"
            completed={this.props.boardCompleted}
            sticker={this.props.sticker}
            placeSticker={this.props.onPlaceSticker}
          />
          <Sticker
            stickerID="2"
            completed={this.props.boardCompleted}
            sticker={this.props.sticker}
            placeSticker={this.props.onPlaceSticker}
          />
          <Sticker
            stickerID="3"
            completed={this.props.boardCompleted}
            sticker={this.props.sticker}
            placeSticker={this.props.onPlaceSticker}
          />
          <div className="sticker reward">
            <img
              style={{
                animation:
                  this.props.boardCompleted && this.props.pageAnimation
                    ? "rotation 2s"
                    : ""
              }}
              src={this.props.reward.src}
              alt={this.props.reward.alt}
            />
          </div>
          {/* {placedStickers} */}
          {/* </div> */}
          {/* <div className="reward">
            <p>I'm working for...</p>
            <img src={this.props.reward.src} alt={this.props.reward.alt} />
          </div> */}
        </div>
        {/* {reset()} */}
      </div>
    );
  }
}

export default StickerBoard;
