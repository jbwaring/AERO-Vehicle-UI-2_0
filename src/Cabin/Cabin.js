
import React, {useState, useEffect, useRef} from "react";
import Switch from "../Switch/Switch";
import './Cabin.scss'


const Cabin = (props) => {


    const [state, setState] = useState({
        "sim/cockpit/switches/gear_handle_status": 0,
        "sim/graphics/animation/lights/airplane_panel_spill": 0
    })
    const [socket, setSocket] = useState(new WebSocket(props.socketURL))
  //  --- WebSocket Functions

    socket.onopen = function(e) {
    console.log(`onOpen -- CABIN`)    
    };

    socket.onmessage = function (event) {
        try {
            const message = JSON.parse(event.data)
            console.log(message)
            if (message.error) { 
                const dref = message.dref
                const actualValue = message.actualValue
                console.log("ERROR")
                setState({
                    ...state, 
                    [dref]: actualValue
                })

                console.log(state)
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


    const setDREF = (newState, dref) => { 
        // console.log(`Setting ${dref} to ${newState}.`)
        let request = {
            "setDREF": "true",
            "dref": dref,
            "value": newState
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

    return (<div id="cabin-panel">

        <h1 id="cabin-panel-title">Cabin</h1>
        <div id="cabin-switch-panel">
        <div className="switch">
                <p>Landing Gear</p>
                <Switch id="test-switch" debug={false} state={{
            state: state["sim/cockpit/switches/gear_handle_status"],
            onText: "DN",
            offText: "UP",
        
        }} changeState={(subState) => { 
            setDREF(subState, "sim/cockpit/switches/gear_handle_status")
                }} />
        </div>
            
        
        <div className="switch">
                <p>Panel Lights</p>
                <Switch id="test-switch-2" debug={false} state={{
            state: state["sim/cockpit/electrical/cockpit_lights"],
            onText: "ON",
            offText: "OFF",
        
        }} changeState={(subState) => { 
            setDREF(subState, "sim/cockpit/electrical/cockpit_lights")
                }} />
        </div>
        {/* <Switch debug={false} state={{
            state: false,
            onText: "TESTON",
            offText: "TESTOFF",
        
        }} changeState={(state) => { 
            setDREF(state, "/sim/light")
                }} />
        <Switch debug={false} state={{
            state: false,
            onText: "TESTON",
            offText: "TESTOFF",
        
        }} changeState={(state) => { 
            setDREF(state, "/sim/light")
                }} /> */}
            </div>
    </div>
    
    )

}

export default Cabin;