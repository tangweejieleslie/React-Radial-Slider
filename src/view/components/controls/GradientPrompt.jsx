import React, { Component } from "react";

let WIDTH = 400;
let HEIGHT = 400;
let FILL = "none";
let CX = WIDTH / 2;
let CY = HEIGHT / 2;
let RADIUS = WIDTH / 2 - 20;
let STROKE_WIDTH = 7;
let DEGREE = 10;
let TRANSFORM = "rotate(" + DEGREE + ", 200, 200)";
let MOUSEDOWN = null;

// References
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
// https://stackoverflow.com/questions/22579508/subtract-one-circle-from-another-in-svg > use mask to hide parts
// https://www.w3schools.com/graphics/svg_grad_linear.asp
class GradientPrompt extends Component {
  state = {
    DEGREE: 100,
    TRANSFORM: "rotate(" + this.state.DEGREE + ", 200, 200)"
  };

  // https://stackoverflow.com/questions/24217087/how-to-determine-scroll-direction-without-actually-scrolling
  MouseWheel(e) {
      e.preventDefault();
    console.log("Mouse wheel");
    // console.log(e);
    if (e.deltaY < 0) {
      //   console.log("scrolling up" + this.state.DEGREE);
      let degree = this.state.DEGREE + 1;
      this.setState({ DEGREE: degree });
    } else if (e.deltaY > 0) {
      //   console.log("scrolling down: " + this.state.DEGREE);
      let degree = this.state.DEGREE - 1;
      this.setState({ DEGREE: degree });
    }
  }

  render() {
    return (
      <svg height={HEIGHT} width={WIDTH}>
        <defs>
          <linearGradient id="HotColdGradient">
            <stop offset="0%" stopColor="#3495E4" />
            <stop offset="100%" stopColor="#E4656E" />
          </linearGradient>

          <linearGradient id="MaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="84%" stopColor="white" />
            <stop offset="85%" stopColor="black" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>

          <linearGradient id="MaskGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="90%" stopColor="white" />
            <stop offset="91%" stopColor="black" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>

          <linearGradient id="BlackOnly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="83%" stopColor="white" stopOpacity="0" />
            <stop offset="84%" stopColor="#586369" />
            <stop offset="100%" stopColor="#586369" />
          </linearGradient>

          <pattern
            id="VerticalStripesPattern"
            x="0"
            y="0"
            width="10"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              className="VerticalStripes"
              x="0"
              y="0"
              width="5"
              height="20"
              fill="black"
            />
          </pattern>
        </defs>

        {/* Mask to hide unnecessary portions */}
        <mask id="MaskPrompt">
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            stroke="url('#MaskGradient')"
            strokeWidth={STROKE_WIDTH}
          ></circle>
        </mask>

        {/* Mask to hide unnecessary portions */}
        <mask id="MaskSlider">
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS - 20}
            strokeWidth={STROKE_WIDTH + 20}
            stroke="url('#MaskGradient2')"
          ></circle>
        </mask>

        {/* BLACK PORTION TO INDICATE NO SELECTION ZONE */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          stroke="url('#BlackOnly')"
          strokeWidth={STROKE_WIDTH}
          fill={FILL}
        />

        {/* GRADIENT PORTION TO INDICATE TEMPERATURE SELECTION */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          stroke="url('#HotColdGradient')"
          strokeWidth={STROKE_WIDTH}
          fill={FILL}
          mask="url(#MaskPrompt)"
        />

{/* https://developer.mozilla.org/en-US/docs/Web/SVG/Scripting */}
        {/* SLIDER */}
        <circle
            id="Slider"
          cx={CX}
          cy={CY}
          r={RADIUS - 20}
          strokeWidth={STROKE_WIDTH + 20}
          stroke="gray"
          fill="none"
          mask="url(#MaskSlider)"
        //   onWheel={this.MouseWheel}
        />

        <line
          id="Slider"
          x1="200"
          y1="30"
          x2="200"
          y2="50"
          style={{ stroke: "yellow", strokeWidth: 3 }}
          transform={this.state.TRANSFORM}
        ></line>
      </svg>
    );
  }
}

function MouseEnterSlider() {
  console.log("Mouse entered");
}



export default GradientPrompt;
