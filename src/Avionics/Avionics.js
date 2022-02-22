
import React, { useState, useEffect, useRef } from 'react';
// import '../Home.css'
import './Avionics.css'
import Gauge from './Gauge';
import cryptoRandomString from 'crypto-random-string';
const mainFontSizeDebug = 25;
const unitFontSizeDebug = 16;
const textFontSizeDebug = 12;
const debug = 1;


const Avionics = (props) => {
  const ws = props.socket
  const [buffer, setBuffer] = useState({
    "sim/flightmodel/engine/ENGN_N2_": {
      index: [0, 1],
      values: []
    },
    "sim/flightmodel/engine/ENGN_N1_": {
      index: [0, 1],
      values: []
    },
    "sim/flightmodel/engine/ENGN_EGT_c": {
      index: [0, 1],
      values: []
    }
  })
  const [state, setState] = useState(initialState);
  useInterval(async () => {
    let request = {
      "isUsingMultipleDREF": "true",
    }
    for (const [bufferKey, bufferValue] of Object.entries(buffer)) {
      //console.log(bufferKey)
      request[bufferKey] = bufferValue.index
    }
    //console.log(request)
    ws.send(JSON.stringify(request))
  }, 100)

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    let prevState = { ...buffer };
    for (const [key, value] of Object.entries(buffer)) { 
      prevState[key].values = json[key]
    }
    console.log(prevState)
    setBuffer(prevState)
  };


  
  let gaugeList = [];
    Object.keys(state).map((key) => { 
      gaugeList.push(<Gauge key={`${state[key].dref}${cryptoRandomString({length: 64, characters: 'ABCDEF'})}`} value={buffer[state[key].dref].values[state[key].index]} index={state[key].index} error={ state[key].error} maxValue={state[key].maxValue} text={state[key].text} unit={state[key].unit} decimals={state[key].decimals} mainFontSize={state[key].mainFontSize} unitFontSize={state[key].unitFontSize} textFontSize={state[key].textFontSize}/>);
    })
    
    return (<div>
        <div className='gauges'>
        {gaugeList}
            </div>
            </div>);

}



export default Avionics;



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}



async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}



const initialState = {
  0: {
    dref: "sim/flightmodel/engine/ENGN_N1_",
    index: 0,
    value: 0,
    error: false,
    maxValue: 100,
    text: "N1",
    unit: "%",
    decimals: "1",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  },
  1: {
    dref: "sim/flightmodel/engine/ENGN_N1_",
    index: 0,
    value: 0,
    error: false,
    maxValue: 100,
    text: "N1",
    unit: "%",
    decimals: "1",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  },
  2: {
    dref: "sim/flightmodel/engine/ENGN_N2_",
    index: 0,
    value: 0,
    error: false,
    maxValue: 100,
    text: "N2",
    unit: "%",
    decimals: "1",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  },
  3: {
    dref: "sim/flightmodel/engine/ENGN_N2_",
    index: 1,
    value: 0,
    error: false,
    maxValue: 100,
    text: "N2",
    unit: "%",
    decimals: "1",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  },
  4: {
    dref: "sim/flightmodel/engine/ENGN_EGT_c",
    index: 0,
    value: 0,
    error: false,
    maxValue: 1000,
    text: "EGT",
    unit: "c",
    decimals: "0",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  },
  6: {
    dref: "sim/flightmodel/engine/ENGN_EGT_c",
    index: 1,
    value: 0,
    error: false,
    maxValue: 1000,
    text: "EGT",
    unit: "c",
    decimals: "0",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  },
  7: {
    dref: "sim/flightmodel/engine/ENGN_EGT_c",
    index: 0,
    value: 0,
    error: false,
    maxValue: 1000,
    text: "EGT",
    unit: "c",
    decimals: "0",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  },
  8: {
    dref: "sim/flightmodel/engine/ENGN_EGT_c",
    index: 1,
    value: 0,
    error: true,
    maxValue: 1000,
    text: "EGT",
    unit: "c",
    decimals: "0",
    mainFontSize: mainFontSizeDebug,
    unitFontSize: unitFontSizeDebug,
    textFontSize: textFontSizeDebug
  }
};