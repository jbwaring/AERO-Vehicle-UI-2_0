import './Gauge.css'
import React, { useState, useEffect, useRef } from 'react';
import outerGaugeRing from './Outer-Ring-Stroke.svg';
import errorCross from '/public/red_cross.png'
import { Stage, Layer, Rect, Text, Circle, Line, Arc } from 'react-konva';

const percent = 0.8;
// 0 --> 280
const Gauge = (props) => { 

  const [value, setValue] = useState(0);
  const [error, setError] = useState(false)
  const [socket, setSocket] = useState(new WebSocket(props.socketURL))
  //  --- WebSocket Functions
  
  const pollXPlane = () => { 
 
      let request = {
        "isUsingMultipleDREF": "true",
        [props.dref]: [props.index]
      }
    
        try {
          socket.send(JSON.stringify(request))
  
        } catch (error) {
          console.log(`Caught Error while sending ${error}`);
        }
    
  }

socket.onopen = function(e) {
  console.log(`onOpen`)
  pollXPlane()
  
};

socket.onmessage = function(event) {
  // console.log(`onMessage`)
  let timeout = 100;
  const json = JSON.parse(event.data)
  if (json[props.dref]) {
    setValue(json[props.dref])
    setError(false);
  } 
  if (json.error) { 
    console.log(json)
    setError(true);
    timeout = 500;
  }
  if (!socket.OPEN) { 
    timeout = timeout + 1000;
  }
  setTimeout(() => pollXPlane(), timeout)
  
};

  socket.onclose = function (event) {
    console.log(`onClose`)
  if (event.wasClean) {
    console.log(event)
  } else {
    console.log('[close] Connection died');
  }
};
  
  socket.onerror = function (error) {
    console.log(`onError`)
  console.log(`[error] ${error.message}`);
};
  return (
    <div className='gauge-wrapper' style={{left: props.left, top: props.top}}>
      <p className='gauge-center-text' style={{ fontSize: props.mainFontSize}} >{parseFloat(value*props.conversionFactor).toFixed(props.decimals)}</p>
      <p className='gauge-unit-text' style={{ fontSize: props.unitFontSize}} >{props.unit}</p>
      <p className='gauge-text' style={{ fontSize: props.textFontSize}} >{props.text}</p>
      {error && <div className='gauge-error-div' style={{ backgroundImage: `url(${errorCross})`,   backgroundRepeat: 'no-repeat', backgroundSize: '230px 230px', backgroundPosition: 'center' }}>
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










// socket.onmessage = (event) => { 

//   try {
//     const json = JSON.parse(event.data)
//     setValue(json[props.dref])
//     console.log(value)
//     setError(false)
//       } catch (error) {
//     console.log(error)
//     setError(true)
//       }
// }
// socket.onclose = (event) => { 
//   console.log('Socket Closed')
// }
// socket.onerror = (event) => { 
//   setError(true)
//   console.log(error);
//   setTimeout(() => { 
//     try {
//       socket = new WebSocket(socketURL)
//     } catch (error) {
//       console.log('Error')
//     }
//   }, 1000)
// }
// function isOpen(ws) { return ws.readyState === ws.OPEN }
// useInterval(async () => {
//   let request = {
//     "isUsingMultipleDREF": "true",
//     [props.dref] : [props.index]
//   }
//   if (isOpen(socket)) {
//     try {
//       socket.send(JSON.stringify(request))

//     } catch (error) {
//       console.log(`Caught Error while sending ${error}`);
//     }
    
//   } else { 
//     console.log("ERROR WILL TRY NEW WEBSOCKET")

//     socket = new WebSocket(props.socketURL)
//     setError(true)
//   }
  
// }, 100)
