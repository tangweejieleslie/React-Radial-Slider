import React, { Component } from "react";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
class CurrentTemperatureView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemperature: this.props.currentTemp
    };
  }

  // https://alligator.io/react/get-derived-state/
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      currentTemperature: Number(nextProps.currentTemp)
    };  
  }

  renderCurrentTemperature(CurrentTemperature) {
    let fontCenterX = CENTER_X;
    let fontCenterY = CENTER_Y;

    return (
      <text
        x={fontCenterX}
        y={fontCenterY}
        dy="60"
        className="CurrentTemperature"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#fafafa"
      >
        Current: {Math.round(CurrentTemperature)}
        {/* &deg;F */}
      </text>
    );
  }

  render() {
    return (
      <svg>{this.renderCurrentTemperature(this.state.currentTemperature)}</svg>
    );
  }
}

export default CurrentTemperatureView;
