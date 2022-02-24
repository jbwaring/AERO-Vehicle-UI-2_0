import React, {useState, useEffect, useRef} from "react";
import './Loader.scss'
import Terminal from 'react-console-emulator'
import Home from '../Home/Home'
import loaderBackground from '/public/Loader-Background.svg'
import homeBackground from '/public/home-background.svg'
// const webSocketURL = 'ws://192.168.2.46:9001'
const webSocketURL = 'ws:localhost:9001'

const Loader = () => {

    const terminal = useRef()
    const [state, setState] = useState({
        showTerminal: true,
        showHome: false
    })
    const print = (message) => {
        if (terminal.current.getStdout().length > 27) {
            terminal.current.clearStdout()
        }
       
        terminal.current.pushToStdout(message)
    }
    const [socket, setSocket] = useState(new WebSocket(webSocketURL));
    socket.onopen = (event) => {
        print(`SUCCESS: Connected to ${webSocketURL}`)
        initCommWithXPlane();
    }
    socket.onerror = (event) => {
        print(`ERROR: we could not connect to the Socket at ${webSocketURL}`)
        setTimeout(function () { setSocket(new WebSocket(webSocketURL)) }, 1000);
    }
    socket.onclose = (event) => {
        print(`WARNING: Socket at ${webSocketURL} was closed by the host.`)
    }
    socket.onmessage = (message) => {
        message = JSON.parse(message.data)
        console.log(message);
        if (message.code == 500) {
            print(`${message.message}`)
            setTimeout(function () { initCommWithXPlane() }, 300);
        }
        if (message.code == 200) {
            print(`${message.message}`)
            setTimeout(function () { 
                setState({
                showTerminal: false,
                showHome: true
                })
                document.getElementById('home-background-image').style.opacity = 1;
                document.getElementById('loader-background-image').style.opacity = 0;
             }, 1000);
            

        }
    }
    
    const initCommWithXPlane = () => {
        const initObj = {
            command: "CONNECT"
        }
        socket.send(JSON.stringify(initObj))
        print(`Trying to communicate with XPlane...`)
    }
    setTimeout(function () { 
        document.getElementById('terminal-glass').style.opacity = 1;
     }, 500);
    return (
        
        <div>
            <img src={loaderBackground} id="loader-background-image" />
            <img src={homeBackground} id="home-background-image" />
            {state.showTerminal &&
                
                <div id="terminal-glass">
                <Terminal
                    commands={{}}
                    ref={terminal}
                    welcomeMessage={`CAAS Vehicle UI
        (c) 2022 Jean-Baptiste Waring
        Waiting on Avionics Socket...`}
                    promptLabel={'me@React:~$'}
                    style={{ backgroundColor: null, height: '1080px' }} // Terminal background
                    contentStyle={{ color: 'black' }} // Text colour
                    promptLabelStyle={{ color: '#00000' }} // Prompt label colour
                    inputTextStyle={{ color: 'red' }} // Prompt text colour
                    promptLabel={<b>root@React:~$</b>}
                    styleEchoBack='fullInherit' // Inherit echo styling from prompt
                        readOnly
                    />
                </div>
                }
            {state.showHome &&
                <Home socket={socket} socketURL={ webSocketURL}/>}
        </div>
           
    )

};

export default Loader;