import React, { Component } from 'react';
// import GradientPrompt from './components/controls/GradientPrompt'
// import SmallEvent from './components/controls/SmallEvent'
// import CustomEvent from './components/controls/CustomEvent'
import FinalRadialSlider from './components/controls/FinalRadialSlider'

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
            {/* <CustomEvent></CustomEvent> */}
            <FinalRadialSlider></FinalRadialSlider>
          </div>
        );
    }
}

export default ControlsPanel;