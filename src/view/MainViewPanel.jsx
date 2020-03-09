import React, { Component } from "react";
import CurrentTempControl from "./components/controls/CurrentTempControlView";


class MainViewPanel extends Component {
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

export default MainViewPanel;
