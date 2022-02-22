import './Switch.css'
import React, { useEffect, useState } from 'react';

const fontSize = 16;
const transitionDuration = 0.1;
const ONStateStyle = {
    leftStyle: {
        width: "134px",
        height: "72px",
        backgroundColor: "white",
        color: "#04BD00",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 56px rgba(0, 0, 0, 0.15)",
        borderRadius: "6px",
        fontSize: `{fontSize}px`,
        zIndex: 1,
        transition: `ease-in-out ${transitionDuration}s`
            },
    rightStyle: {
        width: "114px",
        height: "56px",
        background: "rgba(26, 28, 72, 0.01)",
        border: "1px solid rgba(148, 153, 195, 0.5)",
        boxShadow: "0px 2px 56px rgba(0, 0, 0, 0.15), inset 0px 0px 50px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: `ease-in-out ${transitionDuration}s`
        
        }
}

const OFFStateStyle = {
    rightStyle: {
        width: "134px",
        height: "72px",
        backgroundColor: "white",
        color: "grey",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 56px rgba(0, 0, 0, 0.15)",
        borderRadius: "6px",
        fontSize: `{fontSize}px`,
        zIndex: 1,
        transition: `ease-in-out ${transitionDuration}s`
            },
    leftStyle: {
        width: "114px",
        height: "56px",
        background: "rgba(26, 28, 72, 0.01)",
        border: "1.5px solid rgba(148, 153, 195, 0.5)",
        boxShadow: "0px 2px 56px rgba(0, 0, 0, 0.15), inset 0px 0px 50px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: `ease-in-out ${transitionDuration}s`
        }
}
const Switch = (props) => {
    
    const [state, setState] = useState({
        ...props.state,
        ...(props.state.state && { ...ONStateStyle }),
        ...(!props.state.state && { ...OFFStateStyle })
    })
    const [switchIsActive, setSwitchIsActive] = useState(state.state);
    const handleLeftClick = () => { // Style of ON State
        setState({
            ...state,
            state: true,
            ...ONStateStyle
        })
    }

    const handleRightClick = () => { //Style of OFF State
        setState({
            ...state,
            state: false,
            ...OFFStateStyle
        })
        
    }

    useEffect( () => {
        if(state.state) { 
            props.changeState(state)
        }else{
            props.changeState(state)
        }
    }, [state.state]);
    return (
        <div>
            {/* {props.debug && <p>Switch for {props.state.dref}, state = {+state.state}</p>} */}
            <div className="SwitchWrapperDiv">
                <div style={state.leftStyle} onClick={handleLeftClick}>{state.onText}</div>
                <div style={ state.rightStyle} onClick={handleRightClick}>{state.offText}</div>
            </div>
        </div>);
}

export default Switch;
