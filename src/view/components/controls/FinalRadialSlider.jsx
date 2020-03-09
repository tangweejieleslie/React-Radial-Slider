import React, { Component } from "react";
import "./controls.css";
import sun from "./sun.svg";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const RADIUS = SVG_WIDTH / 2 - 20;
const CIRCLE_STROKE_WIDTH = 10;
const WHEEL_SCROLL_VALUE = 1;

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
      // console.log("scrolling up: " + this.state.degree);
      tempDegree = tempDegree + WHEEL_SCROLL_VALUE;
      //   Guard to prevent reaching unexpected range
      if (tempDegree > 220) {
        if (tempDegree >= 270) {
          tempDegree = -90;
        }
      } else if (tempDegree > 140 && tempDegree < 180) {
        tempDegree = 140;
      }
      this.setState({
        degree: tempDegree
      });
      this.setTransform(tempDegree);
    } else if (event.deltaY > 0) {
      // console.log("scrolling down: " + this.state.degree);
      tempDegree = tempDegree - WHEEL_SCROLL_VALUE;
      if (tempDegree < -90) {
        tempDegree = 270;
      }
      if (tempDegree > 180 && tempDegree <= 220) {
        tempDegree = 220;
      }
      //   Guard to prevent reaching unexpected range

      this.setState({
        degree: tempDegree
      });
      this.setTransform(tempDegree);
    }
  };
  //   THE ABOVE IS HANDLING MOUSE MOVEMENT

  setTransform = degree => {
    // limit max = 130 220, 180 +30 -30 => 150 - 210

    if (degree > 0 && degree < 140) {
      this.setState({
        transform: "rotate(" + degree + ",200,200)"
      });
    } else if (degree <= 0 && degree >= -90) {
      this.setState({
        transform: "rotate(" + degree + ",200,200)"
      });
    } else if (degree >= 220 && degree <= 270) {
      this.setState({
        transform: "rotate(" + degree + ",200,200)"
      });
    }
    // OUT OF RANGE HANDLING
    else if (degree >= 180 && degree < 220) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      this.setState({
        transform: "rotate(" + 222 + ",200,200)",
        degree: 220
      });

      window.alert("You are moving out of range");
      // console.log("Stop listening for mousemove");
    } else if (degree > 140 && degree <= 180) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      this.setState({
        transform: "rotate(" + 138 + ",200,200)",
        degree: 140
      });
      window.alert("You are moving out of range");
      // console.log("Not listening!");
    }
  };

  // Render Methods
  renderSlider() {
    return (
      <svg>
        <line
          x1="200"
          y1="30"
          x2="200"
          y2="70"
          stroke-linecap="round"
          stroke="#f0f0f0"
          strokeWidth="14"
          transform={this.state.transform}
        ></line>
        <line
          id="SliderButton"
          x1="200"
          y1="32"
          x2="200"
          y2="68"
          stroke-linecap="round"
          stroke="#ffb732"
          strokeWidth="10"
          fill="orange"
          transform={this.state.transform}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        ></line>
      </svg>
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
        stroke="#D6D6D6"
        fill="none"
        onWheel={this.handleWheel}
      ></circle>
    );
  }

  renderSliderPrompt() {
    return (
      <svg>
        <defs>
          <linearGradient id="HotColdGradient">
            <stop offset="0%" stopColor="#3495E4" />
            <stop offset="100%" stopColor="#E4656E" />
          </linearGradient>
          <linearGradient id="MaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="89%" stopColor="white" />
            <stop offset="90%" stopColor="black" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <linearGradient id="BlackOnly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="88%" stopColor="white" stopOpacity="0" />
            <stop offset="88%" stopColor="#586369" />
            <stop offset="100%" stopColor="#586369" />
          </linearGradient>
        </defs>
        <mask id="MaskPrompt">
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS}
            stroke="url('#MaskGradient')"
            strokeWidth={CIRCLE_STROKE_WIDTH}
          ></circle>
        </mask>
        {/* GRADIENT PORTION TO INDICATE TEMPERATURE SELECTION */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={RADIUS}
          stroke="url('#HotColdGradient')"
          strokeWidth={CIRCLE_STROKE_WIDTH}
          fill="none"
          mask="url(#MaskPrompt)"
        />
        {/* BLACK PORTION TO INDICATE NO SELECTION ZONE */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={RADIUS}
          stroke="url('#BlackOnly')"
          strokeWidth={CIRCLE_STROKE_WIDTH}
          fill="none"
        />
      </svg>
    );
  }

  // https://stackoverflow.com/questions/28128491/svg-center-text-in-circle
  renderTargetedTemperature(TargetedTemperature) {
    let fontCenterX = CENTER_X;
    let fontCenterY = CENTER_Y;

    return (
      <text
        x={fontCenterX}
        y={fontCenterY}
        class="TargetedTemperature"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#fafafa"
      >
        {Math.round(TargetedTemperature)}
      </text>
    );
  }

  renderCurrentTemperature(CurrentTemperature) {
    let fontCenterX = CENTER_X;
    let fontCenterY = CENTER_Y;

    return (
      <text
        x={fontCenterX}
        y={fontCenterY}
        dy="60"
        class="CurrentTemperature"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#fafafa"
      >
        Current: {Math.round(CurrentTemperature)}
      </text>
    );
  }

  renderBackground() {
    return (
      <circle
        id="CircleBackground"
        cx={CENTER_X}
        cy={CENTER_Y}
        r={RADIUS}
        strokeWidth={CIRCLE_STROKE_WIDTH * 3}
        stroke="none"
        fill="#586369"
      ></circle>
    );
  }

  // https://icons8.com/icons/set/sun
  renderSun(color) {

    const logowidth = 30;
    const logoheight = 30;

    return (
      <svg
      fill={color}
        // fill="#fafafa"
        // fill="black"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={logowidth}
        height={logoheight}
        x={CENTER_X-logowidth/2}
        y={CENTER_Y-logoheight/2 + 95}
      >
        <path d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 C 8.1458514 5 5 8.1458514 5 12 C 5 15.854149 8.1458514 19 12 19 C 15.854149 19 19 15.854149 19 12 C 19 8.1458514 15.854149 5 12 5 z M 12 7 C 14.773268 7 17 9.2267316 17 12 C 17 14.773268 14.773268 17 12 17 C 9.2267316 17 7 14.773268 7 12 C 7 9.2267316 9.2267316 7 12 7 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z M 11 21 L 11 24 L 13 24 L 13 21 L 11 21 z" />
      </svg>
    );
  }

  render() {
    return (
      <div>
        <h1> Slider </h1>
        <div class="flexbox">
        <svg height={SVG_HEIGHT} width={SVG_WIDTH} id="SVG_BOX">
          {this.renderBackground()}
          {this.renderSliderArea()}
          {this.renderSliderPrompt()}
          {this.renderSlider()}

          {this.renderTargetedTemperature(50)}
          {this.renderCurrentTemperature(10)}
          {this.renderSun("pink")}
        </svg>
        </div>

      </div>
    );
  }
}

export default FinalRadialSlider;
