import React, {useState, useEffect, useRef} from "react";
import './DockIcon.css'


const DockIcon = (props) => {
    
    const [state, setState] = useState({
        icon: props.icon,
        title: props.title,
        isSelected: props.isSelected,
        onClick: props.onClick,
        id: props.id
    })


    return (<div id={state.id} className="DockIcon" onClick={() => state.onClick({buttonPressed: state.title, isSelected: state.isSelected})}>
          <div className='DockIconImage'>
        <span className="material-icons md-48 md-light">
        {state.icon}
          </span>
          </div>
          <div className='DockIconTitle'>{state.title}</div>
            </div>);
  

}

export default DockIcon;