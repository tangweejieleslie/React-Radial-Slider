import React, { Component } from "react";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const RADIUS = SVG_WIDTH / 2 - 20;
const CIRCLE_STROKE_WIDTH = 10;
const WHEEL_SCROLL_VALUE = 10;

class FinalRadialSlider extends Component {
  state = {
    degree: 0,
    transform: "rotate(0)",
    isMouseDown: false,
    isMouseMove: false
  };

  handleMouseDown = event => {
    // console.log("detect mouse down");
    event.preventDefault();
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      isMouseDown: true
    });
  };

  handleMouseMove = event => {
    event.preventDefault();
    // console.log("detect mouse move");
    this.setState({
      isMouseMove: true
    });

    const node = document.getElementById("SliderArea").getBoundingClientRect();
    const CircleCenterX = (node.left + node.right) / 2;
    const CircleCenterY = (node.top + node.bottom) / 2;
    // console.log(node);
    // console.log(CircleCenterX, CircleCenterY);
    // console.log(event);

    let degree;
    // https://blog.plover.com/prog/atan2.html
    degree =
      90 +
      (Math.atan2(event.pageY - CircleCenterY, event.pageX - CircleCenterX) *
        180) /
        Math.PI;

    this.setTransform(degree);

    this.setState({
      degree: degree
    });
  };

  handleMouseUp = event => {
    event.preventDefault();

    this.setState({
      isMouseMove: false,
      isMouseDown: false
    });
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

//   TODO: Fix scrolling bug
  handleWheel = event => {
    // event.preventDefault();

    var tempDegree = this.state.degree;
    if (event.deltaY < 0) {
      console.log("scrolling up: " + this.state.degree);
      tempDegree = (tempDegree + WHEEL_SCROLL_VALUE);
      //   Guard to prevent reaching unexpected range

      this.setState({
        degree: tempDegree
      });
      this.setTransform(tempDegree);
    } else if (event.deltaY > 0) {
      console.log("scrolling down: " + this.state.degree);
      tempDegree = (tempDegree - WHEEL_SCROLL_VALUE);
      //   Guard to prevent reaching unexpected range

      this.setState({
        degree: tempDegree
      });
      this.setTransform(tempDegree%360);
    }
  };
  //   THE ABOVE IS HANDLING MOUSE MOVEMENT

  setTransform = degree => {
    // limit max = 130 220, 180 +30 -30 => 150 - 210

    if (degree > 139 && degree < 219) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      console.log("Not listening!");
    } else {
      this.setState({
        transform: "rotate(" + degree + ",200,200)"
      });
      //   console.log(this.state.transform);
    }
  };

  // Render Methods
  renderSlider() {
    return (
      <line
        id="SliderButton"
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
        id="SliderArea"
        cx={CENTER_X}
        cy={CENTER_Y}
        r={RADIUS - 20}
        strokeWidth={CIRCLE_STROKE_WIDTH * 3}
        stroke="#dfdfdf"
        fill="none"
        onWheel={this.handleWheel}
      ></circle>
    );
  }

  render() {
    return (
      <div>
        <h1> Slider </h1>
        <svg height={SVG_HEIGHT} width={SVG_WIDTH} id="SVG_BOX">
          {this.renderSliderArea()}
          {this.renderSlider()}
        </svg>
      </div>
    );
  }
}

export default FinalRadialSlider;
