import React, { Component } from "react";
import RadialSliderView from "./RadialSliderView";
const WHEEL_SCROLL_VALUE = 10;

class CurrentTempControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemp: 72,
      temporaryCurrentTemperature: 72,
      sliderXPos: 123
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
        <RadialSliderView
          currentTemp={this.state.currentTemp}
        ></RadialSliderView>
        <h2>Update Current Temperature</h2>
        <div>
          <strong>32&deg;F</strong>
          <svg width="250" height="50">
            {this.renderSliderLine()}
            {this.renderSliderButton()}
          </svg>
          <strong>100&deg;F</strong>
        </div>

        {this.renderControls()}
      </div>
    );
  }

// Event handling implemented with reference to https://github.com/dmitrymorozoff/react-circle-slider

  handleWheel = event => {

    var newPos = this.state.sliderXPos;
    if (event.deltaY < 0) {

      if (newPos <= 230) {
        this.setState({
          sliderXPos: newPos + WHEEL_SCROLL_VALUE
        });
      }
    } else if (event.deltaY > 0) {

      if (newPos >= 20) {
        this.setState({
          sliderXPos: newPos - WHEEL_SCROLL_VALUE
        });
      }
    }

    this.updateTemp();
  };

  handleMouseDown = event => {
    event.preventDefault();
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      isMouseDown: true
    });
  };

  handleMouseMove = event => {
    event.preventDefault();
    this.setState({
      isMouseMove: true
    });

    let newPos = event.offsetX;

    if (newPos >= 10 && newPos <= 240) {
      this.updateTemp();
      this.setState({
        sliderXPos: newPos
      });
    } else {
      window.removeEventListener("mousemove", this.handleMouseMove);
    }
  };

  updateTemp() {
    let newTemp = 0;

    let x = this.state.sliderXPos;

    newTemp = (x / 220) * 68;
    newTemp = Math.round(newTemp) + 28;

    if (newTemp < 32) {
      newTemp = 32;
      // send();
    } else if (newTemp > 100) {
      newTemp = 100;
    }

    this.setState({
      temporaryCurrentTemperature: newTemp
    });
  }

  handleMouseUp = event => {
    event.preventDefault();

    this.setState({
      isMouseMove: false,
      isMouseDown: false
    });
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  handleChange = event => {
    let newCurrentTemp = event.target.value;
    this.setState({ temporaryCurrentTemperature: newCurrentTemp });
  };

  updateCurrentTemp = event => {
    event.preventDefault();
    let newCurrentTemp = this.state.temporaryCurrentTemperature;

    if (newCurrentTemp >= 32 && newCurrentTemp <= 100) {
      this.setState({ currentTemp: this.state.temporaryCurrentTemperature });
      this.setState({ currentTemp: this.state.temporaryCurrentTemperature });
    } else {
      window.alert("Current temperature must be >= 32 AND <=100");
    }
  };

  renderControls() {
    return (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.temporaryCurrentTemperature}
        ></input>
        <br></br>
        <button onClick={this.updateCurrentTemp}>Update</button>
      </form>
    );
  }

  renderSliderButton() {
    return (
      <svg>
        <circle
          id="SliderArea"
          cx={this.state.sliderXPos}
          cy={25}
          r={8}
          strokeWidth={1}
          stroke="#1a1a1a"
          fill="#D6D6D6"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        ></circle>
      </svg>
    );
  }

  renderSliderLine() {
    return (
      <svg>
        <line
          stroke="#ffffff"
          strokeWidth="50"
          fill="black"
          x1="0"
          x2="500"
          y1="25"
          y2="25"
          onWheel={this.handleWheel}
        ></line>
        <line
          stroke="#bbbbbb"
          strokeWidth="1"
          x1="0"
          x2="500"
          y1="25"
          y2="25"
          onWheel={this.handleWheel}
        ></line>
      </svg>
    );
  }


}

export default CurrentTempControl;
