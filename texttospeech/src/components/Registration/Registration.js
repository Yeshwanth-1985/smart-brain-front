import React, {useState} from 'react';
import CryptoJS from 'crypto-js';
import '../Signin/Signin.css';
import {useHistory} from "react-router-dom";

const Registration = (props) => {

let history = useHistory();

if(localStorage.getItem('token'))
{
  fetch("https://thawing-escarpment-40827.herokuapp.com/refresh",{
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({})
    })
  .then(response => response.json())
  .then(data => {
    if(data.user){
      props.loaduser(data.user);
      history.push("/home");
    }
    else {
      localStorage.removeItem("token");
      history.push('/signin');
    }
    })
}

const onEmailChange = (event) => {
  setemail(event.target.value);
}

const onPasswordChange = (event) => {
  setpassword(event.target.value);
}

const onUsernameChange = (event) => {
  setusername(event.target.value);
}

const onSubmit = () => {
  if(regusername && regemail && regpassword && regemail.includes('@') && regemail.includes('.com'))
  {
  fetch('https://thawing-escarpment-40827.herokuapp.com/register',{
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        username: regusername,
        email: regemail,
        password: CryptoJS.AES.encrypt(regpassword, process.env.ACCESS_TOKEN_SECRET).toString()
        })
    })
  .then(response => response.json())
  .then(data => {
    if(data.token){
      localStorage.setItem('token', data.token);
      props.loaduser(data.user);
      history.push('/home');
    }
    else{
      alert("Unable to register,try again"); 
      history.push('/register');
    }
  })
}
else {
   alert("Unable to register,try again");
}
}

const [regemail, setemail] = useState('');
const [regpassword, setpassword] = useState('');
const [regusername, setusername] = useState(''); 

  return (
    <>
    <article className="br4 ba b--white-10 mv4 w-100 w-50-m w-25-l mw10 shadow-5 center">
    <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
        <input 
        className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="name"  
        id="name"
        onChange={onUsernameChange} 
        />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
        <input 
        className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address" 
        onChange={onEmailChange}
        />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
        <input 
        className="hover-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password"
        onChange={onPasswordChange} />
      </div>
      </fieldset>
    <div className="">
      <input 
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      onClick={onSubmit}
      type="submit" 
      value="Register" />
    </div>
  </div>
</main>
</article>
    </>
  );
}


export default Registration;