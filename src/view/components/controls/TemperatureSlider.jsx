import React, { Component } from "react";

class TemperatureSlider extends Component {
  state = {
    degree: 0,
    transform: "rotate(0)"
  };

  setTransform = degree => {
    if (degree > 0 && degree < 140) {
      this.setState({
        transform: "rotate(" + degree + ",200,200)"
      });
    } else if (degree <= 0 && degree >= -90) {
      this.setState({
        transform: "rotate(" + degree + ",200,200)"
      });
    } else if (degree >= 220 && degree <= 270) {
      this.setState({
        transform: "rotate(" + degree + ",200,200)"
      });
    }
    // OUT OF RANGE HANDLING
    else if (degree >= 180 && degree < 220) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      this.setState({
        transform: "rotate(" + 220 + ",200,200)",
        degree: 220
      });

      window.alert("You are moving out of range");
      console.log("Stop listening for mousemove");
    } else if (degree > 140 && degree <= 180) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      this.setState({
        transform: "rotate(" + 140 + ",200,200)",
        degree: 140
      });
      window.alert("You are moving out of range");
      console.log("Not listening!");
    }
  };

  renderSlider() {
    return (
      <line
        id="SliderButton"
        x1="200"
        y1="30"
        x2="200"
        y2="70"
        style={{ stroke: "black", strokeWidth: 10 }}
        transform={this.state.transform}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      ></line>
    );
  }
}

export default TemperatureSlider;
