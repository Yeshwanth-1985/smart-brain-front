import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import CryptoJS from 'crypto-js';

const Forgot = (props) => {

const [email,setemail] = useState('');
const [username,setusername] = useState('');
const [password,setpassword] = useState('');
const [conpassword,setconpassword] = useState('');

const onEmailChange = (e) => {
	setemail(e.target.value);
}

const onUsernameChange = (e) => {
	setusername(e.target.value);
}

const onPasswordChange = (e) => {
	setpassword(e.target.value);
}

const onConpasswordChange = (e) => {
	setconpassword(e.target.value);
}

const onPassSubmit = () => {
	if(password && conpassword && password===conpassword)
	{
          var ciphertext = CryptoJS.AES.encrypt(password, "secret key 123").toString();
            fetch('https://thawing-escarpment-40827.herokuapp.com/reset',{
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                  email: props.usermail,
                  password: ciphertext
                  })
              })
            .then(response => response.json())
            .then(data => {
               if(data.success){
                    props.setusermail('');
                    history.push(process.env.PUBLIC_URL+"/signin");
                    alert("Password reseted succesfully, kindly login");
               }
               else {
                    alert("Unable to reset,try again");
               }
            })
	}
	else {
		alert("error in password data");
	}
}


const toforgot = () => {
	props.setusermail('');
	history.push(process.env.PUBLIC_URL + "/forgot");
}

const onSubmit = () => 
{
	if(email && username && email.includes('@')) {
	fetch('https://thawing-escarpment-40827.herokuapp.com/forgot',{
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: email,
        username: username
        })
    })
  .then(response => response.json())
  .then(data => {
	if(data.success)
     {
          alert("Reset your password");
          props.setusermail(email);
     }
     else {
     alert("Details are not matched");
     }

     })
     
     }

     else 
	alert("invalid data");
}

let history = useHistory();

const tomain = () => {
     props.setusermail('');
	history.push(process.env.PUBLIC_URL+"/");
}
if(props.usermail) {
	return (
		<>
		<div className='profile-modal'>
		<div className="card mywidth">
  <div className="card-body">
  <div className='modal-close'>
  <img
	      src={`https://robohash.org/hiiii}`}
      	  className="br-100 bg-black ba h3 w3 dib" alt="avatar" />
      	  <p className='mt2 f5 fw6'>Reset Password</p>
      	  <p className='close-text' onClick={toforgot}>&times;</p>
      	  </div> 
    <label className='mt2 fw6' htmlFor="password">{props.usermail}</label>
   <label className='mt2 fw6' htmlFor="password">New Password:</label>
        <input 
        className="pa2 ba w-100"
        placeholder="Password" 
        type="password" 
        name="password"  
        id="password" 
        onChange={onPasswordChange}
        />
   <label className='mt2 fw6' htmlFor="conpassword">Confirm Password:</label>
        <input 
        className="pa2 ba w-100"
        placeholder="Confirm Password" 
        type="password" 
        name="conpassword"  
        id="conpassword"
        onChange={onConpasswordChange} 
        />
        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
        	<button 
        	className='btn btn-primary'
        	onClick={onPassSubmit}
        	>
        	Reset
        	</button>
        	<button 
        	className='btn btn-danger'
        	onClick={toforgot}
        	>
        	Cancel
        	</button>
        </div>
  </div>
    </div>
  </div>
		</>
		);
}
else {
	return (
		<>
		<div className='profile-modal'>
		<div className="card mywidth">
  <div className="card-body">
  <div className='modal-close'>
  <img
	      src={`https://robohash.org/hiiii}`}
      	  className="br-100 bg-black ba h3 w3 dib" alt="avatar" />
      	  <p className='mt2 f5 fw6'>Confirm Details</p>
      	  <p className='close-text' onClick={tomain}>&times;</p>
      	  </div> 
   <label className='mt2 fw6' htmlFor="email">Email:</label>
        <input 
        className="pa2 ba w-100"
        placeholder="Email" 
        type="text" 
        name="email"  
        id="email" 
        onChange={onEmailChange}
        />
   <label className='mt2 fw6' htmlFor="user-name">Username:</label>
        <input 
        className="pa2 ba w-100"
        placeholder="Username" 
        type="text" 
        name="user-name"  
        id="user-name"
        onChange={onUsernameChange} 
        />
        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
        	<button 
        	className='btn btn-primary'
        	onClick={onSubmit}
        	>
        	Confirm
        	</button>
        	<button 
        	className='btn btn-danger'
        	onClick={tomain}
        	>
        	Cancel
        	</button>
        </div>
  </div>
    </div>
  </div>
		</>
		);
}
}

export default Forgot;