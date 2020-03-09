import React from 'react';
import './App.css';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react/';
import MainViewPanel from './view/MainViewPanel';
import StateMachine from './StateMachine';

console.log(StateMachine)
// https://xstate.js.org/docs/guides/parallel.html
// https://xstate.js.org/docs/guides/hierarchical.html

const CheckModeStates = {
  initial: 'CheckMode',
  states: {
    CheckMode: {
      on: {
        CONDITION_1: 'Cooling',
        CONDITION_2: 'Heating',
        CONDITION_3: 'Off',
        CONDITION_4: 'History',
      }
    },
    Cooling: {},
    Heating: {},
    Off: {},
    History: {}
  }
};

const TTChangeStates = {
  initial: 'ListenForTTChange',
  states: {
    ListenForTTChange: {
      on: {
        TT_change: "TT_CheckTemp",
        TT_noChange: "ListenForTTChange"
      }
    },
    TT_CheckTemp: {
      on: {
        TT_TempTooHigh: "TT_Invalid",
        TT_TempTooLow: "TT_Invalid",
        TT_TempOK: "TT_Update"
      }
    },
    TT_Invalid: {
      on: {
        TT_Listen: "ListenForTTChange",
      }
    },
    TT_Update: {}
  }
}

const CTChangeStates = {
  initial: 'ListenForCTChange',
  states: {
    ListenForCTChange: {
      on: {
        change: "CT_CheckTemp",
        noChange: "ListenForCTChange"
      }
    },
    CT_CheckTemp: {
      on: {
        CT_TempTooHigh: "CT_Invalid",
        CT_TempTooLow: "CT_Invalid",
        CT_TempOK: "CT_Update"
      }
    },
    CT_Invalid: {
      on: {
        CT_Listen: "ListenForCTChange",
      }
    },
    CT_Update: {}
  }
}

const ThermostatMachine = new Machine({
  context: {
    mode: "off",
    targetTemp: 72,
    currentTemp: 72
  },
  id: 'ThermostatMachine',
  initial: 'ListenForTemperatureChange',
  states: {
    ListenForTemperatureChange: {
      type: 'parallel',
      on: {
        TemperatureUpdate: 'CheckMode'
      },
      states: {
        UpdateTargetTemperature: {
          ...TTChangeStates

        },
        UpdateCurrentTemperature: {
          ...CTChangeStates
        },
      }


    },
    CheckMode: {
      on: {
        ModeUpdate: 'ListenForTemperatureChange'
      },
      ...CheckModeStates
    }
  }
})

function App() {
  const [current, send] = useMachine(ThermostatMachine);

  return (
    <div>
      <MainViewPanel></MainViewPanel>
    </div>

  );
}



export default App;
