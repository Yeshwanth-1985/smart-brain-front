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
import Modal from './components/Modal/Modal.js';
import Profile from './components/Profile/Profile.js';
import Changepass from './components/Changepass/Changepass.js';
import {  BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from './components/Home/Auth.js';
import Home from './components/Home/Home.js';
import Forgot from './components/Forgot/Forgot.js';

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
  const [isProfileOpen, setprofile] = useState(false);
  const [forgotuser,setforgotuser] = useState('');

const setusermail = (value) => {
  setforgotuser(value);
}

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


const  onInputChange = (e) => {
setinput(e.target.value);
  }

const togglemodal = () => {
  setprofile(!isProfileOpen);
}

const  onSubmit = () => {
  if((input.endsWith(".jpg") || input.endsWith(".png")) && !input.includes('<script>')) {
   setimageUrl(input);
    fetch('https://thawing-escarpment-40827.herokuapp.com/imageurl',{
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
            input: input
          })
        })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://thawing-escarpment-40827.herokuapp.com/image',{
          method: 'put',
          headers: {
            'Content-type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
          },
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
    alert("Image link isn't compatible");
  }
}

  return (
    <div className="App">
    <Router>
    <Switch>
    <Route exact path={process.env.PUBLIC_URL+"/"}>
        <>
         {console.log("came")}
      <Particles className='particles' params={Particlesoptions} />
      <Navigation userid={user.id} togglemodal={togglemodal}/>
      <Logo />
       <Home />
        </>
    </Route>
    <Route exact path={process.env.PUBLIC_URL+"/home"}>
        <>
      <Auth user={user} loaduser={loaduser}/>
      <Particles className='particles' params={Particlesoptions} />
      <Navigation userid={user.id} togglemodal={togglemodal}/>
      <Logo />
      <Rank username={user.name} count={user.entries}/>
      <ImageLinkForm onSubmit={onSubmit} onInputChange={onInputChange}/>
      <FaceDetection box={box} width={width} height={height} imageUrl={imageUrl}/>
      {isProfileOpen && <Modal>
            <Profile isProfileOpen={isProfileOpen} loaduser={loaduser} togglemodal={togglemodal} user={user}/>
        </Modal> }
       </>
    </Route>
    <Route exact path={process.env.PUBLIC_URL+"/changepass"}>
        <>
        <Auth user={user} loaduser={loaduser}/>
      <Particles className='particles' params={Particlesoptions} />
      <Navigation userid={user.id} togglemodal={togglemodal}/>
       <Logo />
       <Changepass loaduser={loaduser}/>
       {isProfileOpen && <Modal>
            <Profile isProfileOpen={isProfileOpen} loaduser={loaduser} togglemodal={togglemodal} user={user}/>
        </Modal> }
       </>
    </Route>
    <Route exact path={process.env.PUBLIC_URL+"/signin"}>
        <>
        {console.log("hiiii",process.env.PUBLIC_URL)}
      <Particles className='particles' params={Particlesoptions} />
      <Navigation userid={user.id} togglemodal={togglemodal}/>
       <Signin loaduser={loaduser} /> 
       </>
    </Route>
    <Route exact path={process.env.PUBLIC_URL+"/register"}>
        <>
      <Particles className='particles' params={Particlesoptions} />
      <Navigation userid={user.id} togglemodal={togglemodal}/>
       <Registration loaduser={loaduser} />
       </>
    </Route>
    <Route exact path={process.env.PUBLIC_URL+"/forgot"}>
        <>
      <Particles className='particles' params={Particlesoptions} />
      <Navigation userid={user.id} togglemodal={togglemodal}/>
      <Forgot usermail={forgotuser} setusermail={setusermail}/>
       </>
    </Route>
    </Switch>
    </Router>
    </div>
  );
}


export default App;
