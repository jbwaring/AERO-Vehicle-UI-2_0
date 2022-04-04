
import React, {useState, useEffect, useRef} from "react";
import Switch from "../Switch/Switch";
import './Autopilot.scss'


const Autopilot = (props) => {


    const [state, setState] = useState({
        verticalSpeed: 0,
    })
    const [socket, setSocket] = useState(new WebSocket(props.socketURL))
  //  --- WebSocket Functions

    socket.onopen = function(e) {
    console.log(`onOpen -- Autopilot`)    
    };

    socket.onmessage = function (event) {
        try {
            const message = JSON.parse(event.data)
            console.log(message)
            if (message.dref === "sim/cockpit/autopilot/vertical_velocity") { 
                console.log(`${state.verticalSpeed} === ${message.actualValue}`)
                if (state.verticalSpeed != message.actualvalue) { 
                    setDREF()
                }
                // setState({
                //     ...state, verticalSpeed: message.actualvalue
                // })
            }
            // if (message.error) { 
            //     const dref = message.dref
            //     const actualValue = message.actualValue
            //     console.log("ERROR")
            //     setState({
            //         ...state, 
            //         [dref]: actualValue
            //     })

            //     console.log(state) 
            // }
        } catch (error) {
            
        }
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


    // const setDREF = (newState, dref) => { 
    const setDREF = () => { 
        // console.log(`Setting ${dref} to ${newState}.`)
        let request = {
            "setDREF": "true",
            "dref": "sim/cockpit/autopilot/vertical_velocity",
            "value": state.verticalSpeed
          }
        
        try {
            if (!socket.CONNECTING) {
                socket.send(JSON.stringify(request))
                // console.log(request)
            } else { 
                //Do not change switch position
            }
      
            } catch (error) {
              console.log(`Caught Error while sending ${error}`);
            }
    }

    return (<div id="autopilot-panel">

        <h1 id="autopilot-panel-title">Autopilot</h1>
        <div id="autopilot-switch-panel">
            <div className="autopilot-plus-or-minus-switch">
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, verticalSpeed: (state.verticalSpeed === -5000 ? state.verticalSpeed : state.verticalSpeed - 100) })
                    setDREF()
                    }}>-</div>
                <div className="autopilot-plus-or-minus-switch-text">
                    <div className="autopilot-plus-or-minus-switch-text-heading">Vertical Speed</div>
                    <div className="autopilot-plus-or-minus-switch-text-value">{state.verticalSpeed} ft/m</div>
                </div>
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, verticalSpeed: (state.verticalSpeed === 5000 ? state.verticalSpeed : state.verticalSpeed + 100) })
                    setDREF()
                    }}>+</div>
            </div>
            <div className="autopilot-plus-or-minus-switch">
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, verticalSpeed: (state.verticalSpeed === 0 ? state.altitude : state.altitude - 100) })
                    setDREF()
                    }}>-</div>
                <div className="autopilot-plus-or-minus-switch-text">
                    <div className="autopilot-plus-or-minus-switch-text-heading">Hold Altitude</div>
                    <div className="autopilot-plus-or-minus-switch-text-value">{state.altitude} ft/m</div>
                </div>
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, verticalSpeed: (state.verticalSpeed === 10000 ? state.altitude : state.altitude + 100) })
                    setDREF()
                    }}>+</div>
            </div>
        </div>
            </div>)

}

export default Autopilot;