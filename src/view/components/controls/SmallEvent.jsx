import React, { Component } from 'react';

class SmallEvent extends Component{

    myRect(x,y,w,h,message){

    }

    render(){
        return(
            <svg>
            <circle
            id="Slider"
          cx={200}
          cy={200}
          r={100}
          strokeWidth={20}
          stroke="gray"
          fill="none"
        //   mask="url(#MaskSlider)"
        //   onWheel={this.MouseWheel}
        />
            </svg>

        );
    }
}

export default SmallEvent;