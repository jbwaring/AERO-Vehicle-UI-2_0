import React, {useState, useEffect, useRef} from "react";
import './Map.scss'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import zoomOutIcon from '/public/zoom_out.svg'
import zoomInIcon from '/public/zoom_in.svg'
import mapAlign from '/public/rotate-map.svg'
import craftIcon from '/public/airplane-icon.svg'
mapboxgl.accessToken = 'pk.eyJ1IjoiamJ3YXJpbmciLCJhIjoiY2wwMDBvcmV6MGZiejNpbHMwdTd2ZXZ2eCJ9.OdOEarOSPZrCw5gqVPlx4A';

let previousHeading = 0;
const Map = (props) => {
    const socket = new WebSocket(props.socketURL)
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [heading, setHeading] = useState(50);
    const [north, setNorth] = useState(true)
    const [zoom, setZoom] = useState(9);    
    const mapContainer = useRef(null);
    const map = useRef(null);
   
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/jbwaring/cl000va2f001115s5vqojnf4w',
        center: [lng, lat],
        zoom: zoom
        });
        map.current.scrollZoom.disable()
        map.current.boxZoom.disable()
        map.current.dragRotate.disable()
        map.current.dragPan.disable()
        map.current.keyboard.disable()
        map.current.doubleClickZoom.disable()
        map.current.touchZoomRotate.disable()
        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disableRotation();

        
    });

    
    useEffect(() => {
        if (zoom > 20) { 
            setZoom(20)
        }
        if (zoom === -1) { 
            setZoom(0)
        }
        map.current.easeTo({center: [lng, lat], zoom: zoom, bearing: north ? 0 : heading, duration: 1000});
    },[zoom, lng, lat, heading, north]);
    
    useInterval(async () => {
        let request = {
          "command": "GETPOSITION",
        }
        socket.send(JSON.stringify(request))
      }, 1000)
    
    socket.onmessage = function (event) {
          
        const json = JSON.parse(event.data)
        console.log(json);
        try {
            const newLat = json.position[0]
            const newLon = json.position[1]
            const newHeading = json.heading
            setLat(newLat)
            setLng(newLon)
            setHeading(Math.trunc(newHeading ))
            console.log(heading)
        } catch (error) {
            console.log(error)
        }
      };
    const getAirplaneIconOrientation = () => { 
        try {
            let temp = parseInt(document.getElementById('airplane-icon').style.transform)
            if (temp) { 
                previousHeading = temp;
                // console.log(previousHeading)
            }
        } catch (error) {
            
        }
        
        if (!north === true) { 
            return 0;
        }
        var delta = ((((heading - previousHeading) % 360) + 540) % 360) - 180;
        return previousHeading + delta;
    }
    return (
        <div id="map-canvas">
{/* <div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div> */}
    <div ref={mapContainer} className="map-container" />
            <div id="map-zoom-out" onClick={() => { 
                console.log("zoom-out")
                setZoom(zoom-1)
            }}>
                <img src={zoomOutIcon} />
            </div>
            <div id="map-zoom-in" onClick={() => { 
                console.log("zoom-in")
                setZoom(zoom+1)
            }}>
                <img src={zoomInIcon} />
            </div>
            <div id="map-align" onClick={() => { 
                console.log("map-align")
                setNorth(!north)
            }}>
                <img src={mapAlign} />
            </div>
            <img id="airplane-icon" src={craftIcon} style={{
                transform: `rotate(${getAirplaneIconOrientation()}deg)`
    }}/>
        </div>
    )
}

export default Map;



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