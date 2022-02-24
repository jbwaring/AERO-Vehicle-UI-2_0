import './Gauge.css'
import React, { useState, useEffect, useRef } from 'react';
import outerGaugeRing from './Outer-Ring-Stroke.svg';
import { Stage, Layer, Rect, Text, Circle, Line, Arc } from 'react-konva';

const percent = 0.8;
// 0 --> 280
const Gauge = (props) => { 

  const socket = new WebSocket(props.socketURL)
  const [value, setValue] = useState(0);

  useInterval(async () => {
    let request = {
      "isUsingMultipleDREF": "true",
      [props.dref] : [props.index]
    }

    socket.send(JSON.stringify(request))
  }, 1000)
  socket.onmessage = (event) => { 
    

    try {
      const json = JSON.parse(event.data)
            setValue(json[props.dref])
        } catch (error) {
            console.log(error)
        }
  }


  return (
    <div className='gauge-wrapper' style={{left: props.left, top: props.top}}>
      <p className='gauge-center-text' style={{ fontSize: props.mainFontSize}} >{parseFloat(value*props.conversionFactor).toFixed(props.decimals)}</p>
      <p className='gauge-unit-text' style={{ fontSize: props.unitFontSize}} >{props.unit}</p>
      <p className='gauge-text' style={{ fontSize: props.textFontSize}} >{props.text}</p>
      {props.error && <div className='gauge-error-div'>
          </div>}
    </div>);

}



export default Gauge;

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