import React, {useState, useEffect, useRef} from "react";
import Autopilot from "../Autopilot/Autopilot";
import Gauge from "../Avionics/Gauge";
import Cabin from "../Cabin/Cabin";
import Map from "../Map/Map";
import './Home.css'


const Home = (props) => {

  const socket = new WebSocket(props.socketURL)
   
    socket.onmessage = function (event) {
        console.log(`EVENT: ${event}`)
    }


 

   
    return (
        <div id="home-canvas">

            <Cabin socketURL={ props.socketURL }/>
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Speed"} unit={"km/h"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/flightmodel/position/groundspeed'} index={0} conversionFactor={3.6} left={545} top={85}/>;
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Altitude"} unit={"m"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/flightmodel/position/y_agl'} index={0} conversionFactor={1} left={763} top={85}/>;
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Vertical Speed"} unit={"m/s"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/cockpit2/gauges/indicators/vvi_fpm_pilot'} index={0} conversionFactor={0.00508} left={981} top={85}/>;
            <Gauge value={100} index={0} error={false} maxValue={1000} text={"Temperature"} unit={"C"} decimals={0} mainFontSize={30} unitFontSize={20} textFontSize={18} socketURL={props.socketURL} dref={'sim/weather/temperature_ambient_c'} index={0} conversionFactor={1} left={1199} top={85} />;
            <Map socketURL={props.socketURL} />
            <Autopilot socketURL={ props.socketURL }/>
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