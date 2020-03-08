import React, { Component } from 'react';


class GradientPrompt extends Component {
    render(){
        return(
            <svg height="24" viewBox="0 0 125 24" width="125"
                xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fill-rule="evenodd">
                        <path d="m4.5 12h58.5 58.5" stroke="#979797" stroke-linecap="round" stroke-width="2"></path>
                        <circle cx="63" cy="12" fill="red" r="7"></circle>
                    </g>
            </svg>
        );
    }
}

export default GradientPrompt;