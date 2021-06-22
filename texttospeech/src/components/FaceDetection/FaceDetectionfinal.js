import React from 'react';
import './FaceDetection.css';

const FaceDetection = (props) => {

  const calculatefacelocation = (face) => {
  return {
    leftcol: face.left_col * props.width,
    toprow: face.top_row * props.height,
    rightcol: props.width - (face.right_col * props.width),
    bottomrow: props.height - (face.bottom_row * props.height)
  }
  }

  return (
    <div className='center'>
      <div className="absolute mt4">
    <img id='inputimage' src={props.imageUrl} width="50%" height="auto" alt=""/>
      { props.box.map((face,i) => {
        const tempface = calculatefacelocation(face.region_info.bounding_box);
        return (
          <div key={i}>
        <div className='bounding-box' style={{top: tempface.toprow, right: tempface.rightcol, bottom: tempface.bottomrow, left: tempface.leftcol}}>  
            </div>
            </div>
            );
      })
      }
      </div>
      </div>
  );
}


export default FaceDetection;