import React, {useState, useEffect, useRef} from "react";
import Gauge from "../Avionics/Gauge";
import Map from "../Map/Map";
import './Home.css'



const Home = (props) => {
    const socket = useRef(props.socket)
   
    socket.current.onmessage = function (event) {
        console.log(`EVENT: ${event}`)
    }

    useInterval(() => { 
        const initObj = {
            command: "CONNECT"
        }
        socket.current.send(JSON.stringify(initObj))
        console.log(`Trying to communicate with XPlane...`)
    }, 2000)

   
    return (
        <div id="home-canvas">

            <Map socketURL={ props.socketURL}/>
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Speed"} unit={"km/h"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/flightmodel/position/groundspeed'} index={0} conversionFactor={3.6} left={545} top={85}/>;
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Altitude"} unit={"m"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/flightmodel/position/y_agl'} index={0} conversionFactor={1} left={763} top={85}/>;
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Vertical Speed"} unit={"m/s"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/cockpit2/gauges/indicators/vvi_fpm_pilot'} index={0} conversionFactor={0.00508} left={981} top={85}/>;
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Temperature"} unit={"C"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/weather/temperature_ambient_c'} index={0} conversionFactor={1} left={1199} top={85}/>;
        </div>
    )
}

export default Home;





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