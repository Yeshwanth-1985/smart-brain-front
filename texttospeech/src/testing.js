import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import FaceDetection from './components/FaceDetection/FaceDetection.js';

const app = new Clarifai.App({
  apiKey: '8ec008b477174d33a1eb4fa65c5f5ff2',
});

const Particlesoptions = {
                    particles: {
                        number: {
                          value: 30,
                          density: {
                            enable: true,
                            value_area: 600
                          },
                        move: {
                            radius: 5
                        }
                        }
                    }
                }

const App = () => {
  const [input, setinput] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [box, setbox]= useState({});

const calculatefacelocation = (data) => {
  const face = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftcol: face.left_col * width,
    toprow: face.top_row * height,
    rightcol: width - (face.right_col * width),
    bottomrow: height - (face.bottom_row * height)
  }
}

const displayface = (box) => {
  setbox(box);
  console.log(box);
}

const  onInputChange = (e) => {
setinput(e.target.value);
  }

const  onSubmit = () => {
   setimageUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL,input)
    .then(response => displayface(calculatefacelocation(response)))
    .catch(err => console.log("erros is: ",err));
  }

  return (
    <div className="App">
    <Particles className='particles' params={Particlesoptions} />
     <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onSubmit={onSubmit} onInputChange={onInputChange}/>
      <FaceDetection box={box} imageUrl={imageUrl}/>
    </div>
  );
}


export default App;
