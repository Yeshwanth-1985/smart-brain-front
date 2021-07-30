import React, {useState} from 'react';
import CryptoJS from 'crypto-js';
import './Signin.css';
import {useHistory, Link} from "react-router-dom";

const Signin = (props) => {

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

const onSubmit = () => {

  if(signinemail && signinpassword  && signinemail.includes('@') && signinemail.includes('.com') && !signinemail.includes('<script>') && !signinpassword.includes('<script>'))
  {
    var ciphertext = CryptoJS.AES.encrypt(signinpassword, process.env.ACCESS_TOKEN_SECRET).toString();
  fetch('https://thawing-escarpment-40827.herokuapp.com/signin',{
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: signinemail,
        password: ciphertext
        })
    })
  .then(response => response.json())
  .then(data => {
    if(data.user){
      localStorage.setItem('token', data.token);
      props.loaduser(data.user);
      history.push("/home");
    }
    else{
      alert("Unable to signin,try again");
      history.push("/signin");
    }
  })
  }
  else {
    alert("Unable to signin,try again");
  }
}

const [signinemail, setemail] = useState('');
const [signinpassword, setpassword] = useState('');

  return (
    <>
    <article className="br4 ba b--white-10 mv4 w-100 w-50-m w-25-l mw10 shadow-5 center">
    <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Login In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
        <input 
        className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address" 
        onChange={onEmailChange} 
        id="email-address" />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
        <input 
        className="hover-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password" 
        onChange={onPasswordChange} 
        id="password" />
      </div>
      </fieldset>
    <div className="">
      <input 
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" 
      onClick={onSubmit}
      value="Sign in" />
    </div>
    <div className="lh-copy mt3">
      <Link to="/register"><p className="pointer f4 link dim black underline db pa3">Register</p></Link>
    </div>
  </div>
</main>
</article>
    </>
  );
}


export default Signin;