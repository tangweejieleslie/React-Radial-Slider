import React, { Component } from 'react';
import GradientPrompt from './components/controls/GradientPrompt'
import SmallEvent from './components/controls/SmallEvent'
import CustomEvent from './components/controls/CustomEvent'
class ControlsPanel extends Component {
    render(){
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >

            {/* <GradientPrompt></GradientPrompt>
            <SmallEvent></SmallEvent> */}
            <CustomEvent></CustomEvent>
          </div>
        );
    }
}

export default ControlsPanel;