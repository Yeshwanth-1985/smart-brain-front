import React from 'react';
import './FaceDetection.css';

const FaceDetection = (props) => {
  const box= props.box;
  return (
    <div className='center'>
      <div className="absolute mt4">
    <img id='inputimage' src={props.imageUrl} width="500px" height="auto" alt=""/>
      <div className='bounding-box' style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}>
      </div>
      </div>
    </div>
  );
}


export default FaceDetection;