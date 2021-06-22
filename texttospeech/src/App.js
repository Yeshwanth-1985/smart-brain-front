import './App.css';
import React, { Component } from 'react';
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

class App extends Component {
  constructor() {
    super();
    const state = {
      input: '',
      imageURL: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/11/8/w600X390/Mahesh_Babu.jpg'
    }
  }

  onInputChange = (e) => {
this.setState({input: e.target.value});
  }

  onSubmit = () => {
    this.setState({imageURL: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/11/8/w600X390/Mahesh_Babu.jpg'});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      "https://images.newindianexpress.com/uploads/user/imagelibrary/2020/11/8/w600X390/Mahesh_Babu.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
      );
  }

  render() {
  return (
    <div className="App">
    <Particles className='particles' params={Particlesoptions} />
     <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
      <FaceDetection imageURL={this.state.imageURL}/>
    </div>
  );
}
}

export default App;
