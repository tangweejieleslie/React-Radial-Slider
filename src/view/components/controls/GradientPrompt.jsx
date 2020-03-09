import React, { Component } from "react";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const RADIUS = SVG_WIDTH / 2 - 20;
const CIRCLE_STROKE_WIDTH = 10;

class GradientPrompt extends Component {
  renderSliderPrompt() {
    return (
      <svg height={SVG_HEIGHT} width={SVG_WIDTH}>
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

  render() {
    return (
    <div>
      hi
      {this.renderSliderPrompt()};
    </div>
    );
  }
}

export default GradientPrompt;
