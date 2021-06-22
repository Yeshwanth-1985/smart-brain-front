import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = (props) => {
  return (
    <div>
    <p className='f3'>
      {'This Magic Brain will detect faces in your pictures. Give a shot'}
    </p>
    <div className='center'>
      <div className='form center pa4 br3 shadow-5'>
        <input type='tex' onChange={props.onInputChange} className='f4 pa2 w-70 center'/>
        <button className='w-30 grow f4 Link ph3 pv2 dib white bg-light-purple' onClick={props.onSubmit}>Detect</button>
      </div>
    </div>
    </div>
  );
}


export default ImageLinkForm;