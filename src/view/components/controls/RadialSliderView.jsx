import React, { Component } from "react";
import TargetTemperatureView from "../info/TargetTemperatureView";
import CurrentTemperatureView from "../info/CurrentTemperatureView";
import ModeView from "../info/ModeView";
import {getModeColor} from "../../../model/thermostat.js"

import "./controls.css";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const RADIUS = SVG_WIDTH / 2 - 20;
const CIRCLE_STROKE_WIDTH = 10;
const WHEEL_SCROLL_VALUE = Math.round(280 / 30);

class RadialSliderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      degree: 64,
      transform: "rotate(64,200,200)",
      isMouseDown: false,
      isMouseMove: false,
      targetTemperature: 72,
      currentTemperature: 72,
      modeColor: "#D6D6D6"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      currentTemperature: Number(nextProps.currentTemp)
    };
  }

  componentDidUpdate(prevProps){
    if ( prevProps.currentTemp !== this.props.currentTemp ) {
      this.updateMode();
    }
  }

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

    const node = document.getElementById("SliderArea").getBoundingClientRect();
    const CircleCenterX = (node.left + node.right) / 2;
    const CircleCenterY = (node.top + node.bottom) / 2;

    // https://blog.plover.com/prog/atan2.html
    let radian = Math.atan2(
      event.pageY - CircleCenterY,
      event.pageX - CircleCenterX
    );

    // 90 degree offset
    let degree = 90 + (radian * 180) / Math.PI;

    this.setState({
      degree: degree
    });
    this.setTransform(degree); 
  };

  handleMouseUp = event => {
    event.preventDefault();

    this.setState({
      isMouseMove: false,
      isMouseDown: false
    });
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  handleWheel = event => {
    // event.preventDefault();

    var tempDegree = this.state.degree;
    if (event.deltaY < 0) {
      tempDegree = tempDegree + WHEEL_SCROLL_VALUE;

      //   Guard to prevent reaching unexpected range
      if (tempDegree > 220) {
        // Transform 270 to -90 on scrolling up
        if (tempDegree >= 270) {
          tempDegree = -90;
        }
      } else if (tempDegree > 140 && tempDegree < 180) {
        // If scrolling up into range, reset to 140
        tempDegree = 140;
      }
    } else if (event.deltaY > 0) {
      tempDegree = tempDegree - WHEEL_SCROLL_VALUE;

      //   Transform -90 to 270 on scrolling down
      if (tempDegree < -90) {
        tempDegree = 270;
      }
      // If scrolling down into range, reset to 220
      if (tempDegree > 180 && tempDegree <= 220) {
        tempDegree = 220;
      }
    }

    this.setState({
      degree: tempDegree
    });
    this.setTransform(tempDegree);
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
        transform: "rotate(" + 222 + ",200,200)",
        degree: 220
      });

      window.alert("Target temperature must be >=50 AND <=80");
    } else if (degree > 140 && degree <= 180) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      this.setState({
        transform: "rotate(" + 138 + ",200,200)",
        degree: 140
      });
      window.alert("Target temperature must be >=50 AND <=80");
    }
    this.computeTargetTemperature();
    this.updateMode();
  };

  computeTargetTemperature() {
    let degree = this.state.degree;

    degree = Math.round(degree);

    // Transform the above mapping into some continuum: the range is now from -140 to 140
    degree = degree + 141; // now the range = 1 to 281
    if (degree > 220) {
      degree = degree - 360;
    }

    if (degree < 0) {
      degree = degree + 360;
    }

    // temp = 50 to 80
    let degreePerUnitTemp = 30 / 280;

    let temperature = degreePerUnitTemp * degree + 50;
    temperature = Math.round(temperature);
    this.setState({
      targetTemperature: temperature
    });
    this.updateMode();
  }

  updateMode(){
    console.log("updateMode");
    let tgtTemp = Number(this.state.targetTemperature);
    let curTemp = Number(this.state.currentTemperature)
    let curModeColor = this.state.modeColor;
    let modeColor = getModeColor(tgtTemp, curTemp, curModeColor);
    console.log(modeColor);
    this.setState({
      modeColor: modeColor
    })

  }

  // Render Methods
  renderSlider() {
    return (
      <svg>
        <line
          x1="200"
          y1="30"
          x2="200"
          y2="70"
          strokeLinecap="round"
          stroke="#f0f0f0"
          strokeWidth="14"
          transform={this.state.transform}
        ></line>
        <line
          id="SliderButton"
          x1="200"
          y1="32"
          x2="200"
          y2="68"
          strokeLinecap="round"
          stroke="#ffb732"
          strokeWidth="10"
          fill="orange"
          transform={this.state.transform}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        ></line>
      </svg>
    );
  }
  renderSliderArea() {
    return (
      <circle
        id="SliderArea"
        cx={CENTER_X}
        cy={CENTER_Y}
        r={RADIUS - 20}
        strokeWidth={CIRCLE_STROKE_WIDTH * 3}
        stroke="#D6D6D6"
        fill="none"
        onWheel={this.handleWheel}
      ></circle>
    );
  }

  renderSliderPrompt() {
    return (
      <svg>
        <defs>
          <linearGradient id="HotColdGradient">
            <stop offset="0%" stopColor="#3495E4" />
            <stop offset="100%" stopColor="#E4656E" />
          </linearGradient>
          <linearGradient id="MaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="89%" stopColor="white" />
            <stop offset="90%" stopColor="black" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <linearGradient id="BlackOnly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="88%" stopColor="white" stopOpacity="0" />
            <stop offset="88%" stopColor="#586369" />
            <stop offset="100%" stopColor="#586369" />
          </linearGradient>
        </defs>
        <mask id="MaskPrompt">
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS}
            stroke="url('#MaskGradient')"
            strokeWidth={CIRCLE_STROKE_WIDTH}
          ></circle>
        </mask>
        {/* GRADIENT PORTION TO INDICATE TEMPERATURE SELECTION */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={RADIUS}
          stroke="url('#HotColdGradient')"
          strokeWidth={CIRCLE_STROKE_WIDTH}
          fill="none"
          mask="url(#MaskPrompt)"
        />
        {/* BLACK PORTION TO INDICATE NO SELECTION ZONE */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={RADIUS}
          stroke="url('#BlackOnly')"
          strokeWidth={CIRCLE_STROKE_WIDTH}
          fill="none"
        />
      </svg>
    );
  }

  renderBackground() {
    return (
      <circle
        id="CircleBackground"
        cx={CENTER_X}
        cy={CENTER_Y}
        r={RADIUS}
        strokeWidth={CIRCLE_STROKE_WIDTH * 3}
        stroke="none"
        fill="#586369"
      ></circle>
    );
  }

  render() {
    return (
      <svg height={SVG_HEIGHT} width={SVG_WIDTH} id="SVG_BOX">
        {this.renderBackground()}
        {this.renderSliderArea()}
        {this.renderSliderPrompt()}
        {this.renderSlider()}
        <TargetTemperatureView
          targetTemp={this.state.targetTemperature}
        ></TargetTemperatureView>

        <CurrentTemperatureView
          currentTemp={this.state.currentTemperature}
        ></CurrentTemperatureView>

        <ModeView color={this.state.modeColor}></ModeView>
      </svg>
    );
  }
}

export default RadialSliderView;
