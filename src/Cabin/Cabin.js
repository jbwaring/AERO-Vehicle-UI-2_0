
import React, {useState, useEffect, useRef} from "react";
import Switch from "../Switch/Switch";

const Cabin = (props) => {

    const socket = useRef(props.socket)
    const [state, setState] = useState({
        "sim/lights/main": {
            dref: "sim/lights/main",
            state: false,
            onText: "ON",
            offText: "OFF"
        },
        "sim/lights/secondary": {
            dref: "sim/lights/secondary",
            state: true,
            onText: "ARM",
            offText: "EXE"
        },
        "sim/cockpit2/switches/taxi_light_on": {
            dref: "sim/cockpit2/switches/taxi_light_on",
            state: false,
            onText: "ON",
            offText: "OFF"
        }
    })
    let debug = true
    const changeState = (childState) => { 
        if (debug) { console.log(childState) }
        if (childState.state === state[childState.dref].state) { 
            // console.log("state is unchanged don't do anything (likely switch init)");
            return;
        }

        if (childState.dref === "sim/cockpit2/switches/taxi_light_on") { 
            let sendObj = {
                "isUsingMultipleDREF": "true",
                "sim/cockpit2/switches/taxi_light_on": ["0"],
                "sim/cockpit2/autopilot/altitude_dial_ft": ["0"]
                
            }
            socket.current.send(JSON.stringify(sendObj))
        }
        

        setState({
            ...state,
            [childState.dref]: {
                ...childState
            }
        })
    }

    socket.current.onmessage = (message) => {
        message = JSON.parse(message.data)
        console.log(message);

        }
    
    
    let switchList = [];
    Object.keys(state).map((key) => { 
        if (debug) { console.log(key) }
        switchList.push(<Switch key={state[key].dref} debug={debug} state={state[key]} changeState={ changeState}/>);
    })

        return (<div>
                    <h1>Cabin</h1>
                    {debug && Object.keys(state).map((key) => { return <p key={state[key].dref}>{state[key].dref} ({state[key].onText}/{state[key].offText}) = { +state[key].state}</p>; })}
                    {switchList}
                </div>);


}

export default Cabin;