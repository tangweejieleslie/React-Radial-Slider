import React, { Component } from "react";
import FinalRadialSlider from "./components/controls/FinalRadialSlider";

class ControlsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemp: 72,
      temporaryCurrentTemperature: 0
    };

  }

  handleChange = event => {
    // event.preventDefault();
    // console.log(event.target.value);
    let newCurrentTemp = event.target.value;
    this.setState({ temporaryCurrentTemperature:newCurrentTemp});
    
  };

  updateCurrentTemp = event => {
    event.preventDefault();
    let newCurrentTemp = this.state.temporaryCurrentTemperature;

    if(newCurrentTemp >=32 && newCurrentTemp <=100){
      this.setState({ currentTemp: this.state.temporaryCurrentTemperature });
      this.setState({ currentTemp: this.state.temporaryCurrentTemperature });
    } else {
      window.alert("Current temperature must be >= 32 AND <=100")
    }


  };

  renderControls() {
    return (
      <div>
        <h2>Change Current Temperature</h2>
        <form>
          <input type="text" onChange={this.handleChange}></input>
          <button onClick={this.updateCurrentTemp}>Update Temperature</button>
          {/* {this.state.currentTemp} */}
        </form>
      </div>
    );
  }

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
          <FinalRadialSlider
            currentTemp={this.state.currentTemp}
          ></FinalRadialSlider>

          {this.renderControls()}
        </div>
      </div>
    );
  }
}

export default ControlsPanel;
