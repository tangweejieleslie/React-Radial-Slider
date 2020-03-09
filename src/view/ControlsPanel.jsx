import React, { Component } from "react";
import FinalRadialSlider from "./components/controls/FinalRadialSlider";

class ControlsPanel extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
            
          }}
        >
                  <FinalRadialSlider></FinalRadialSlider>
                  <h2>Change Current Temperature</h2>
        <form>
          <input type="text" onChange={this.updateTextBox}></input>
          <button onClick={this.updateCurrentTemp}>Submit</button>
        </form>
        </div>

      </div>
    );
  }
}

export default ControlsPanel;
