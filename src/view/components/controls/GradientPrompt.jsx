import React, { Component } from "react";

let WIDTH = 400;
let HEIGHT = 400;
let FILL = "none";
let CX = WIDTH/2;
let CY = HEIGHT/2;
let RADIUS = WIDTH/2.5;
let STROKE_WIDTH = 7;

// References
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
// https://stackoverflow.com/questions/22579508/subtract-one-circle-from-another-in-svg > use mask to hide parts
// https://www.w3schools.com/graphics/svg_grad_linear.asp
class GradientPrompt extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "justify-content": "center"
        }}
      >
        <svg height={HEIGHT} width={WIDTH}>
          <defs>

            <linearGradient id="HotColdGradient">
              <stop offset="0%" stop-color="blue" />
              <stop offset="100%" stop-color="red" />
            </linearGradient>

            <linearGradient id="MaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="white" />
              <stop offset="84%" stop-color="white" />
              <stop offset="85%" stop-color="black" />
              <stop offset="100%" stop-color="black" />
            </linearGradient>

            <linearGradient id="BlackOnly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="white" stop-opacity="0" />
              <stop offset="84%" stop-color="white" stop-opacity="0" />
              <stop offset="85%" stop-color="black" />
              <stop offset="100%" stop-color="black" />
            </linearGradient>
          </defs>
{/* Mask to hide unnecessary portions */}
          <mask id="Mask">
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              stroke="url('#MaskGradient')"
              stroke-width={STROKE_WIDTH}
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
            mask="url(#Mask)"
          />
        </svg>
      </div>
    );
  }
}

export default GradientPrompt;
