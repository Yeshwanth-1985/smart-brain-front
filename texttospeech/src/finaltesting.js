import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Signin from './components/Signin/Signin.js';
import Registration from './components/Registration/Registration.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import FaceDetection from './components/FaceDetection/FaceDetectionfinal.js';

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


  let width;
  let height;

const App = () => {
  const [input, setinput] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [box, setbox]= useState([]);
  const [route, setroute] = useState('signin');
  const [isSignedin, setsignedin] = useState(false);
  const [user, setuser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

const loaduser = (user) => {
  setuser(prevState => ({
          ...prevState,
          id: user.id,
          name: user.name,
          email: user.email,
          entries: user.entries,
          joined: user.joined
  }));
}

const calculatefacelocation = (data) => {
  const face = data.outputs[0].data.regions;
  const image = document.getElementById('inputimage');
  width = Number(image.width);
  height = Number(image.height);
  return face;
}

const displayface = (facesbox) => {
  setbox(facesbox);
}

/*
useEffect(() => {
    fetch('https://thawing-escarpment-40827.herokuapp.com/')
    .then(response => response.json())
    .then(console.log)
  });*/

const onRouteChange = (rout) => {
  setroute(rout);
  if(rout === 'home')
  {
  setsignedin(true);    
  setimageUrl('');
  setinput('');
  setbox([]);
  }
  else 
  setsignedin(false);
}

const  onInputChange = (e) => {
setinput(e.target.value);
  }

const  onSubmit = () => {
  if(input.endsWith(".jpg") || input.endsWith(".png")){
   setimageUrl(input);
    fetch('https://thawing-escarpment-40827.herokuapp.com/imageurl',{
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            input: input
          })
        })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://thawing-escarpment-40827.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
            setuser(prevState => ({
              ...prevState,
              id: prevState.id,
              name: prevState.name,
              email: prevState.email,
              entries: prevState.entries + 1,
              joined: prevState.joined
            }));
        });
      displayface(calculatefacelocation(response))
      }
    })
    .catch(err => console.log("erros is: ",err));
  }
  else {
    alert("Image link should end with .jpg or .png format");
  }
}

  return (
    <div className="App">
    <Particles className='particles' params={Particlesoptions} />
      <Navigation onRouteChange={onRouteChange} isSignedin={isSignedin}/>
     { route === 'home' ? 
     <>
      <Logo />
      <Rank username={user.name} count={user.entries}/>
      <ImageLinkForm onSubmit={onSubmit} onInputChange={onInputChange}/>
      <FaceDetection box={box} width={width} height={height} imageUrl={imageUrl}/>
      </>
      : (route === 'signin' ? 
       <Signin loaduser={loaduser} onRouteChange={onRouteChange} /> 
       : <Registration loaduser={loaduser} onRouteChange={onRouteChange} />
      )
    }
    </div>
  );
}


export default App;
