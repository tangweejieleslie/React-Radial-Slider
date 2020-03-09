import React from 'react';
import './App.css';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react/';
import MainViewPanel from './view/MainViewPanel';
import MachineConfig from './MachineConfig';




function App() {
  return (
    <div>
      <MainViewPanel></MainViewPanel>
    </div>

  );
}



export default App;
