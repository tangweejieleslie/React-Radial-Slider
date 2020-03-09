import React, { Component } from "react";
import CurrentTempControl from "./components/controls/CurrentTempControl";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const RADIUS = SVG_WIDTH / 2 - 20;
const CIRCLE_STROKE_WIDTH = 10;

class ControlsPanelView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemp: 111,
      targetTemp: 222,
      sliderXPos: 123,
      color: "pink"
    };
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <CurrentTempControl></CurrentTempControl>
      </div>
    );
  }
}

export default ControlsPanelView;
