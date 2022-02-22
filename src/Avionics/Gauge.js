import './Gauge.css'
import React, { useState, useEffect, useRef } from 'react';
import outerGaugeRing from './Outer-Ring-Stroke.svg';
import { Stage, Layer, Rect, Text, Circle, Line, Arc } from 'react-konva';

const percent = 0.8;
// 0 --> 280
const Gauge = (props) => { 
  return (
    <div className='gauge-wrapper' key={props.key}>
      <img src={outerGaugeRing} className="outer-gauge-ring" />
      <p className='gauge-center-text' style={{ fontSize: props.mainFontSize}} >{parseFloat(props.value).toFixed(props.decimals)}</p>
      <p className='gauge-unit-text' style={{ fontSize: props.unitFontSize}} >{props.unit}</p>
      <p className='gauge-text' style={{ fontSize: props.textFontSize}} >{props.text}</p>
      <div className='gauge-arc-wrapper'>
        <Stage width={142} height={152}>
          <Layer>
            < Arc x={71} y={76} radius={50} angle={(props.value/props.maxValue)*280} rotation={130} innerRadius={50} outerRadius={60} fill="green" clockwise={false}/>
          </Layer>
          </Stage>
      </div>
      {props.error && <div className='gauge-error-div'>
                  <Stage width={142} height={152}>
                    <Layer>
            <Line points={[0, 0, 142, 152]} stroke="red" strokeWidth={8}/>
            <Line points={[0, 152, 142, 0]} stroke="red" strokeWidth={8} />
                    </Layer>
                  </Stage>
          </div>}
    </div>);

}



export default Gauge;

