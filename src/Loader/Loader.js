import React, {useState, useEffect, useRef} from "react";
import './Loader.css'
import Terminal from 'react-console-emulator'
import Home from '../Home/Home'

// const webSocketURL = 'ws://192.168.2.46:9001'
const webSocketURL = 'ws:localhost:9001'

const Loader = () => {

    const terminal = useRef()
    const [state, setState] = useState({
        showTerminal: true,
        showHome: false
    })
    const print = (message) => {
        if (terminal.current.getStdout().length > 49) {
            terminal.current.clearStdout()
        }
        terminal.current.pushToStdout(message)
    }
    const [socket, setSocket] = useState(new WebSocket(webSocketURL));
    socket.onopen = (event) => {
        print(`(${Date()}) SUCCESS: Connected to ${webSocketURL}`)
        initCommWithXPlane();
    }
    socket.onerror = (event) => {
        print(`(${Date()}) ERROR: we could not connect to the Socket at ${webSocketURL}`)
        setTimeout(function () { setSocket(new WebSocket(webSocketURL)) }, 1000);
    }
    socket.onclose = (event) => {
        print(`(${Date()}) WARNING: Socket at ${webSocketURL} was closed by the host.`)
    }
    socket.onmessage = (message) => {
        message = JSON.parse(message.data)
        console.log(message);
        if (message.code == 500) {
            print(`${message.message}`)
            setTimeout(function () { initCommWithXPlane() }, 1000);
        }
        if (message.code == 200) {
            print(`${message.message}`)
            setState({
                showTerminal: false,
                showHome: true
            })

        }
    }
    
    const initCommWithXPlane = () => {
        const initObj = {
            command: "CONNECT"
        }
        socket.send(JSON.stringify(initObj))
        print(`Trying to communicate with XPlane...`)
    }

    return (
        
        <div>
            {state.showTerminal &&
                <Terminal
                    commands={{}}
                    ref={terminal}
                    welcomeMessage={`CAAS Vehicle UI
        (c) 2022 Jean-Baptiste Waring
        Waiting on Avionics Socket...`}
                    promptLabel={'me@React:~$'}
                    style={{ backgroundColor: null, height: '1080px' }} // Terminal background
                    contentStyle={{ color: 'white' }} // Text colour
                    promptLabelStyle={{ color: '#FFFFFF' }} // Prompt label colour
                    inputTextStyle={{ color: 'red' }} // Prompt text colour
                    promptLabel={<b>root@React:~$</b>}
                    styleEchoBack='fullInherit' // Inherit echo styling from prompt
                    readOnly
                />}
            {state.showHome &&
                <Home  socket={socket} />}
        </div>
           
    )

};

export default Loader;