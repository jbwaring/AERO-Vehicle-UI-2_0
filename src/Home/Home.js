import React, {useState, useEffect, useRef} from "react";
import './Home.css'
import DockIcon from "./DockIcon/DockIcon";
import Cabin from '../Cabin/Cabin'
import Avionics from "../Avionics/Avionics";
import backgroundImage from '/public/home-background.svg'
import dockBackground from '/public/dock-background.svg'
const dockElements = [
    {
       title: "Map",
        icon: "location_on"
    },
    {
       title: "Comms",
        icon: "call"
    },
    {
       title: "Power",
        icon: "settings"
    },
    {
       title: "Avionics",
        icon: "sensors"
    },
    {
       title: "Cabin",
        icon: "cabin"
    },
]


const Home = (props) => {
    const socket = useRef(props.socket)
    const [state, setState] = useState({
        activePage: 0,
    })
    const onDockIconClick = (props) => {
        let newActiveBarCoordinates = Array.from(dockElements, (element) => {

            let rect = document.getElementById(`${element.title}-ICON`).getBoundingClientRect();
            return (rect.left + rect.right) / 2
        })
        let buttonRow = Array.from(dockElements, element => element.title)
        let newIndex = buttonRow.indexOf(props.buttonPressed)
        let newCoordinate = newActiveBarCoordinates[newIndex];
        let activeBar = document.getElementById("DockContainerActiveSelectionBar");
        activeBar.style.left = `${newCoordinate - 34}px`;
        setState({
            activePage: newIndex
        })
      }
    
   
    return (
        <div id="home-canvas" style={{ 
            backgroundImage: `url(${backgroundImage})` 
          }}>

            {state.activePage === 0 && (<div className="MapProvider">
        <h1>MAP</h1>
      </div>)}
      {state.activePage === 1 && (<div className="AvionicsProvider">
      <h1>COMMS</h1>
      </div>)}
      {state.activePage === 2 && (<div className="CabinProvider">
      <h1>POWER</h1>
      </div>)}
      {state.activePage === 3 && (<div className="PowerProvider">
                <Avionics socket={ socket.current}/>
            </div>)}
            {state.activePage === 4 && (<div className="AvionicsProvider">
                <Cabin socket={socket.current} />
      </div>)}
            
            
            <div id="dock">
            <img src={dockBackground} id="dock-background-image"/>
            <div id="DockContainerActiveSelectionBar" />
                <div id="dock-drawer" style={{ gridTemplateColumns:`repeat(${dockElements.length}, 1fr)` }}>
                    {/* <DockIcon icon="location_on" title="Map" onClick={ onDockIconClick}/> */}
                    {dockElements.map(dockElement => <DockIcon id={`${dockElement.title}-ICON`} icon={dockElement.icon} title={dockElement.title} onClick={onDockIconClick} key={dockElement.title}/> )}
                   
                </div>
            </div>
        </div>
    )
}

export default Home;