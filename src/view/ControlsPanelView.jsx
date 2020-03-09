import React, { Component } from "react";
import CurrentTempControl from "./components/controls/CurrentTempControl";


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
