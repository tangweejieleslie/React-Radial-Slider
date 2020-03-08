import React, { Component } from "react";

let WIDTH = 400;
let HEIGHT = 400;
let FILL = "none";
let CX = WIDTH/2;
let CY = HEIGHT/2;
let RADIUS = (WIDTH/2)-20;
let STROKE_WIDTH = 7;
let DEGREE = 12;
let TRANSFORM = "rotate("+ DEGREE + ", 200, 200)"

// References
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
// https://stackoverflow.com/questions/22579508/subtract-one-circle-from-another-in-svg > use mask to hide parts
// https://www.w3schools.com/graphics/svg_grad_linear.asp
class GradientPrompt extends Component {
  render() {
    return (
      <svg height={HEIGHT} width={WIDTH}>
        <defs>
          <linearGradient id="HotColdGradient">
            <stop offset="0%" stop-color="#3495E4" />
            <stop offset="100%" stop-color="#E4656E" />
          </linearGradient>

          <linearGradient id="MaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="white" />
            <stop offset="84%" stop-color="white" />
            <stop offset="85%" stop-color="black" />
            <stop offset="100%" stop-color="black" />
          </linearGradient>

          <linearGradient id="MaskGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="white" />
            <stop offset="90%" stop-color="white" />
            <stop offset="91%" stop-color="black" />
            <stop offset="100%" stop-color="black" />
          </linearGradient>

          <linearGradient id="BlackOnly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="white" stop-opacity="0" />
            <stop offset="83%" stop-color="white" stop-opacity="0" />
            <stop offset="84%" stop-color="#586369" />
            <stop offset="100%" stop-color="#586369" />
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
              class="VerticalStripes"
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
            stroke-width={STROKE_WIDTH}
          ></circle>
        </mask>

        {/* Mask to hide unnecessary portions */}
        <mask id="MaskSlider">
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS - 20}
            stroke-width={STROKE_WIDTH + 20}
            stroke="url('#MaskGradient2')"
          ></circle>
        </mask>

        {/* BLACK PORTION TO INDICATE NO SELECTION ZONE */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          stroke="url('#BlackOnly')"
          stroke-width={STROKE_WIDTH}
          fill={FILL}
        />

        {/* GRADIENT PORTION TO INDICATE TEMPERATURE SELECTION */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          stroke="url('#HotColdGradient')"
          stroke-width={STROKE_WIDTH}
          fill={FILL}
          mask="url(#MaskPrompt)"
        />

        {/* SLIDER */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS - 20}
          stroke-width={STROKE_WIDTH + 20}
          stroke="gray"
          fill="none"
          mask="url(#MaskSlider)"
        />

        <line
          id="Slider"
          x1="200"
          y1="30"
          x2="200"
          y2="50"
          style={{ stroke: "yellow", strokeWidth: 3 }}
          transform={TRANSFORM}
          // transform={this.state.transform}
          // onMouseDown={this.mouseDown}
          // onMouseUp={this.mouseUp}
          // onMouseMove={this.mouseMove}
        ></line>
      </svg>
    );


    function computeSliderPosition() {
        var innerArrow = document.getElementById("inner-arrow");
        innerArrow.setAttribute("transform", "rotate(45,200,200)");
    }
  }
}

export default GradientPrompt;
