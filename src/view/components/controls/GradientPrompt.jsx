import React, { Component } from "react";

class GradientPrompt extends Component {
  render() {
    return (
            <div 
            style={{
                "display": "flex",
                "flex-direction": "row",
                "justify-content": "center" 
            }}
            >
                <svg height="200" width="200">
                <circle cx="100" cy="100" r="90" stroke="black" stroke-width="3" fill="red" />
                </svg>
            </div>

    );
  }
}

export default GradientPrompt;
