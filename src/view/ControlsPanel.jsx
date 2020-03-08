import React, { Component } from 'react';
import GradientPrompt from './components/controls/GradientPrompt'
class ControlsPanel extends Component {
    render(){
        return (
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              "justify-content": "center"
            }}
          >

            <GradientPrompt></GradientPrompt>
          </div>
        );
    }
}

export default ControlsPanel;