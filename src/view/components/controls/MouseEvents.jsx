import React, { Component } from "react";

const WHEEL_SCROLL_VALUE = 1;

class MouseEvents extends Component {
  state = {
    isMouseDown: false,
    isMouseMove: false
  };

  handleMouseDown = event => {
    // console.log("detect mouse down");
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

    let degree;
    // https://blog.plover.com/prog/atan2.html
    degree =
      90 +
      (Math.atan2(event.pageY - CircleCenterY, event.pageX - CircleCenterX) *
        180) /
        Math.PI;

    this.setTransform(degree);

    this.setState({
      degree: degree
    });
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

    var tempDegree = this.state.degree;
    if (event.deltaY < 0) {
      console.log("scrolling up: " + this.state.degree);
      tempDegree = tempDegree + WHEEL_SCROLL_VALUE;
      //   Guard to prevent reaching unexpected range
      if(tempDegree > 220){
        if(tempDegree>=270){tempDegree=-90}
      }else if(tempDegree > 140 && tempDegree<180){ tempDegree = 140};

      this.setState({
        degree: tempDegree
      });
      this.setTransform(tempDegree);
    } else if (event.deltaY > 0) {
      console.log("scrolling down: " + this.state.degree);
      tempDegree = tempDegree - WHEEL_SCROLL_VALUE;
      if(tempDegree <-90){ tempDegree = 270};
      if(tempDegree >180 && tempDegree <=220){ tempDegree = 220};
      //   Guard to prevent reaching unexpected range
      this.setState({
        degree: tempDegree
      });
      this.setTransform(tempDegree);
    }
  };



  render() {
    return (
      <div>

      </div>
    );
  }
}

export default MouseEvents;
