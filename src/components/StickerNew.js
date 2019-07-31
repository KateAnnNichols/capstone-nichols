import React, { Component } from "react";
// import PropTypes from "prop-types";
import target from "../target.png";
import "./sticker.css";

class Sticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickerMoved: false,
      targetSrc: target
    };
  }

  onMoveSticker = () => {
    if (!this.state.stickerMoved) {
      this.setState(state => ({
        stickerMoved: true,
        targetSrc: this.props.sticker.src
      }));
      this.props.placeSticker();
    }
  };

  render() {
    return (
      <div>
        <div className="sticker">
          {/* <div className="target"> */}
          <img
            className="stick"
            id={this.props.stickerID}
            src={this.state.targetSrc}
            alt="target"
            onClick={this.onMoveSticker}
          />
          {/* </div> */}
          {/* <div className="image"> */}
          <img
            style={{ display: this.state.stickerMoved ? "none" : "block" }}
            className="stick"
            src={this.props.sticker.src}
            alt={this.props.sticker.alt}
          />
          {/* </div> */}
        </div>
        {/* <div className="finalSticker" /> */}
      </div>
    );
  }
}

export default Sticker;
