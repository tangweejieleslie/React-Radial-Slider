import React, { Component } from "react";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const RADIUS = SVG_WIDTH / 2 - 20;
const CIRCLE_STROKE_WIDTH = 10;
const WHEEL_SCROLL_VALUE = Math.round(280 / 30);

class TargetTemperatureView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      targetTemperature: this.props.targetTemp
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      targetTemperature: Number(nextProps.targetTemp)
    };
  }

  // https://stackoverflow.com/questions/28128491/svg-center-text-in-circle
  renderTargetedTemperature(TargetedTemperature) {
    let fontCenterX = CENTER_X;
    let fontCenterY = CENTER_Y;

    return (
      <text
        x={fontCenterX}
        y={fontCenterY}
        className="TargetedTemperature"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#fafafa"
      >
        {Math.round(TargetedTemperature)}
      </text>
    );
  }

  render() {
    return (
      <svg>{this.renderTargetedTemperature(this.state.targetTemperature)};</svg>
    );
  }
}

export default TargetTemperatureView;
