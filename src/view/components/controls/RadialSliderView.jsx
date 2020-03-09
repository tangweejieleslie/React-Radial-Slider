import React, { Component } from "react";
import GradientPrompt from './GradientPrompt'

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const RADIUS = SVG_WIDTH / 2 - 20;
const CIRCLE_STROKE_WIDTH = 10;


class RadialSlider extends Component {
  
  // Render Methods
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
        <GradientPrompt></GradientPrompt>
          {this.renderSliderArea()}
         
        </svg>

      </div>
    );
  }
}

export default RadialSlider;
