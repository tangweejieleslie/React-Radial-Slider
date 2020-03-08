import React, { Component } from "react";

let WIDTH = 400;
let HEIGHT = 400;
let FILL = "none";
let CX = WIDTH / 2;
let CY = HEIGHT / 2;
let RADIUS = WIDTH / 2 - 20;
let STROKE_WIDTH = 7;

class CustomEvent extends Component {
  state = {
    degree: 10,
    transform: "rotate(0)",
    isMouseDown: false,
    isMouseMove: false
  };

  // https://github.com/dmitrymorozoff/react-circle-slider/blob/master/src/circle-slider/index.tsx
//   https://stackoverflow.com/questions/34483940/best-way-to-run-mousemove-only-on-mousedown-with-pure-javascript

  handleMouseDown = event => {
    console.log("detect mouse down");
    event.preventDefault();
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      isMouseDown: true
    });
  };

  handleMouseMove = event => {
    event.preventDefault();
    console.log("detect mouse move");
    this.setState({
      isMouseMove: true
    });

    var degree =
      90 +
      (Math.atan2(event.pageY - WIDTH / 2, event.pageX - WIDTH / 2) * 180) /
        Math.PI;

    this.setTransform(degree);
  };

  handleMouseUp = event => {
    event.preventDefault();
    console.log("detect mouse up");
    this.setState({
      isMouseMove: false,
      isMouseDown: false
    });
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  //   THE ABOVE IS HANDLING MOUSE MOVEMENT

  setTransform = degree => {
    this.setState({
      transform: "rotate(" + degree + ",200,200)"
    });
    console.log(this.state.transform);
  };

  renderLine() {
    return (
      <line
        id="Slider"
        x1="200"
        y1="30"
        x2="200"
        y2="70"
        style={{ stroke: "black", strokeWidth: 10 }}
        transform={this.state.transform}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}

      ></line>
    );
  }

  renderSliderArea() {
    return (
      <circle
        id="Slider"
        cx={CX}
        cy={CY}
        r={RADIUS - 20}
        strokeWidth={STROKE_WIDTH + 20}
        stroke="gray"
        fill="none"
        mask="url(#MaskSlider)"
      ></circle>
    );
  }

  render() {
    return (
      <div>
        <svg height={400} width={400}>
          {this.renderSliderArea()}
          {this.renderLine()}
        </svg>
        <input type="text" onChangeCapture={this.updateDegree}></input>
        <button onClick={this.updateTransform}>Submit</button>
      </div>
    );
  }
}

export default CustomEvent;
