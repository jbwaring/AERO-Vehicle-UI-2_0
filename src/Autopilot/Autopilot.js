
import React, {useState, useEffect, useRef} from "react";
import Switch from "../Switch/Switch";
import './Autopilot.scss'


const Autopilot = (props) => {


    const [state, setState] = useState({
        verticalSpeed: 0,
        altitude: 0,
        heading: 0,
        airspeed: 0,
        autopilot_master: 0,
        hold_vs: 0,
        hold_hdg: 0,
        hold_spd: 0, 
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
                if (state.verticalSpeed != message.actualValue) {
                    console.log(`${state.verticalSpeed} != ${message.actualValue}`)
                    console.log(`${typeof state.verticalSpeed} != ${typeof message.actualValue}`)
                    setDREF("vertspeed")
                }
            }
            if (message.dref === "sim/cockpit/autopilot/altitude") { 
                console.log(`${state.altitude} === ${message.actualValue}`)
                if (state.altitude != message.actualValue) {
                    setDREF("alt")
                }
            }
            if (message.dref === "sim/cockpit/autopilot/airspeed") { 
                console.log(`${state.airspeed} === ${message.actualValue}`)
                if (state.airspeed != message.actualValue) {
                    setDREF("airspeed")
                }
            }
            if (message.dref === "sim/cockpit/autopilot/heading_mag") { 
                console.log(`${state.heading} === ${message.actualValue}`)
                if (state.heading != message.actualValue) {
                    setDREF("head")
                }
            }
            if (message.dref === "sim/cockpit/autopilot/autopilot_mode") { 
                var temp = 0
                if (message.actualValue === 2) { 
                    temp = 1
                }
                
                if (state.autopilot_master != temp) {
                    setDREF("autopilot_master")
                }
            }

            if (message.dref === "sim/cockpit/autopilot/autopilot_state") { 
                
                if (parseInt(state.autopilot_state, 16) != message.actualValue) {
                    setDREF("autopilot_state")
                }
            }
          
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



    const setDREF = (command) => { 

        if (command === "vertspeed") {
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

        if (command === "alt") { 
            let request = {
                "setDREF": "true",
                "dref": "sim/cockpit/autopilot/altitude",
                "value": state.altitude
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
        if (command === "head") {
            let request = {
                "setDREF": "true",
                "dref": "sim/cockpit/autopilot/heading_mag",
                "value": state.heading
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
        if (command === "airspeed") {
            let request = {
                "setDREF": "true",
                "dref": "sim/cockpit/autopilot/airspeed",
                "value": state.airspeed
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
        if (command === "autopilot_master") {
            let request = {
                "setDREF": "true",
                "dref": "sim/cockpit/autopilot/autopilot_mode",
                "value": (state.autopilot_master === 1) ? 2 : 0
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
        if (command === "autopilot_state_vs") {
            let request = {
                "setDREF": "true",
                "dref": "sim/cockpit/autopilot/autopilot_state",
                "value": 16,
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
        if (command === "autopilot_state_heading") {
            let request = {
                "setDREF": "true",
                "dref": "sim/cockpit/autopilot/autopilot_state",
                "value": 2,
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
        if (command === "autopilot_state_speed") {
            let request = {
                "setDREF": "true",
                "dref": "sim/cockpit/autopilot/autopilot_state",
                "value": 1,
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
        
    }

    return (<div id="autopilot-panel">

        <h1 id="autopilot-panel-title">Autopilot</h1>
        <div id="autopilot-switch-panel">
            <div className="autopilot-plus-or-minus-switch">
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, verticalSpeed: (state.verticalSpeed === -5000 ? state.verticalSpeed : state.verticalSpeed - 100) })
                    setDREF("vertspeed")
                    }}>-</div>
                <div className="autopilot-plus-or-minus-switch-text">
                    <div className="autopilot-plus-or-minus-switch-text-heading">Vertical Speed</div>
                    <div className="autopilot-plus-or-minus-switch-text-value">{state.verticalSpeed} ft/m</div>
                </div>
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, verticalSpeed: (state.verticalSpeed === 5000 ? state.verticalSpeed : state.verticalSpeed + 100) })
                    setDREF("vertspeed")
                    }}>+</div>
            </div>
            <div className="autopilot-plus-or-minus-switch">
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, altitude: (state.altitude === 0 ? state.altitude : state.altitude - 100) })
                    setDREF("alt")
                    }}>-</div>
                <div className="autopilot-plus-or-minus-switch-text">
                    <div className="autopilot-plus-or-minus-switch-text-heading">Hold Altitude</div>
                    <div className="autopilot-plus-or-minus-switch-text-value">{state.altitude} ft</div>
                </div>
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, altitude: (state.altitude === 10000 ? state.altitude : state.altitude + 100) })
                    setDREF("alt")
                    }}>+</div>
            </div>
            <div className="autopilot-plus-or-minus-switch">
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, airspeed: (state.airspeed === 0 ? state.airspeed : state.airspeed - 5) })
                    setDREF("airspeed")
                    }}>-</div>
                <div className="autopilot-plus-or-minus-switch-text">
                    <div className="autopilot-plus-or-minus-switch-text-heading">Hold Airspeed</div>
                    <div className="autopilot-plus-or-minus-switch-text-value">{state.airspeed} kts</div>
                </div>
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    setState({ ...state, airspeed: (state.airspeed === 340 ? state.airspeed : state.airspeed + 5) })
                    setDREF("airspeed")
                    }}>+</div>
            </div>
            <div className="autopilot-plus-or-minus-switch">
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    var temp_heading = state.heading
                    if (temp_heading === 0) {
                        temp_heading = 359
                    } else { 
                        temp_heading -= 1;
                    }
                    setState({ ...state, heading: temp_heading })
                    setDREF("head")
                    }}>-</div>
                <div className="autopilot-plus-or-minus-switch-text">
                    <div className="autopilot-plus-or-minus-switch-text-heading">Hold Heading</div>
                    <div className="autopilot-plus-or-minus-switch-text-value">{state.heading} deg</div>
                </div>
                <div className="autopilot-plus-or-minus-switch-button" onClick={() => { 
                    var temp_heading = state.heading
                    if (temp_heading === 359) {
                        temp_heading = 0
                    } else { 
                        temp_heading += 1;
                    }
                    setState({ ...state, heading: temp_heading })
                    setDREF("head")
                    }}>+</div>
            </div>
            <div className="autopilot-button-panel">
            <div className="autopilot-master-switch-button" onClick={() => { 
                let newState = (state.autopilot_master === 1) ? 0 : 1
                setState({ ...state, autopilot_master: newState })
                if (newState === 1) { 
                    var element = document.getElementById("master-autopilot-switch-light-1")
                element.style.backgroundColor = 'green';
                } else {
                    var element = document.getElementById("master-autopilot-switch-light-1")
                    element.style.backgroundColor = 'lightgrey';
                }
                setDREF("autopilot_master")
                
            }}>
                A/P Master
            <div className="autopilot-master-switch-light" id="master-autopilot-switch-light-1"></div>
            </div>
            <div className="autopilot-master-switch-button" onClick={() => { 
                var newState = state.hold_vs
                newState = newState === 1 ? 0 : 1;
  
                setState({ ...state, hold_vs: newState })
                if (newState === 1) { 
                    var element = document.getElementById("alt-autopilot-switch-light-1")
                element.style.backgroundColor = 'green';
                } else {
                    var element = document.getElementById("alt-autopilot-switch-light-1")
                    element.style.backgroundColor = 'lightgrey';
                }
                setDREF("autopilot_state_vs")
                
            }}>
                V/S Hold
            <div className="autopilot-master-switch-light" id="alt-autopilot-switch-light-1"></div>
            </div>
            <div className="autopilot-master-switch-button" onClick={() => { 
                 var newState = state.hold_hdg
                 newState = newState === 1 ? 0 : 1;
   
                 setState({ ...state, hold_hdg: newState })
                 if (newState === 1) { 
                     var element = document.getElementById("heading-autopilot-switch-light-1")
                 element.style.backgroundColor = 'green';
                 } else {
                     var element = document.getElementById("heading-autopilot-switch-light-1")
                     element.style.backgroundColor = 'lightgrey';
                 }
                 setDREF("autopilot_state_heading")
                 
            }}>
                Heading Hold
            <div className="autopilot-master-switch-light" id="heading-autopilot-switch-light-1"></div>
            </div>
            <div className="autopilot-master-switch-button" onClick={() => { 
                 var newState = state.hold_spd
                 newState = newState === 1 ? 0 : 1;
   
                 setState({ ...state, hold_spd: newState })
                 if (newState === 1) { 
                     var element = document.getElementById("speed-autopilot-switch-light-1")
                 element.style.backgroundColor = 'green';
                 } else {
                     var element = document.getElementById("speed-autopilot-switch-light-1")
                     element.style.backgroundColor = 'lightgrey';
                 }
                 setDREF("autopilot_state_speed")
                 
            }}>
                Speed Hold
            <div className="autopilot-master-switch-light" id="speed-autopilot-switch-light-1"></div>
                </div>
                </div>
        </div>
            </div>)

}

export default Autopilot;


String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}