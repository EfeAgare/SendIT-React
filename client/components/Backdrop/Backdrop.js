import React from 'react';
// import '../../UI/css/allparcel.css';
import '../../../UI/css/Backdrop.css'


const backdrop = props => (
    <div className="backdrop" onClick={props.click} />
);

export default backdrop;