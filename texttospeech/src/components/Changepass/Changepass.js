import React, {useState} from 'react';
import CryptoJS from 'crypto-js';
import {useHistory} from "react-router-dom";

const Changepass = (props) => {

let history = useHistory();

const onCurrentChange = (event) => {
  setcurpassword(event.target.value);
}

const onNewChange = (event) => {
  setnewpassword(event.target.value);
}

const onConfirmChange = (event) => {
  setconpassword(event.target.value);
}

const onSubmit = () => {
  if(curpassword && newpassword && conpassword && newpassword===conpassword)
  {
  fetch('https://thawing-escarpment-40827.herokuapp.com/changepass',{
      method: 'post',
      headers: {
      	'Content-type': 'application/json',
      	'authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        curpassword: CryptoJS.AES.encrypt(curpassword, 'secret key 123').toString(),
        newpassword: CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString(),
        })
    })
  .then(response => response.json())
  .then(data => {
    if(data.success)
    {
    	alert("successfully changed password");
    history.push("/home");
    }
    else{
     history.push("/home");
     alert("Unable to update"); 
    }
  })
}
else {
   alert("Unable to update");
}
}

const onHome = () => {
	history.push("/home");
}

const [curpassword, setcurpassword] = useState('');
const [newpassword, setnewpassword] = useState('');
const [conpassword, setconpassword] = useState(''); 

  return (
    <>
    <article className="br4 ba b--white-10 mv4 w-100 w-50-m w-25-l mw10 shadow-5 center">
    <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Change Password</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f5" htmlFor="name">Current Password</label>
        <input 
        className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="name"  
        id="name"
        onChange={onCurrentChange} 
        />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f5" htmlFor="newpassword">New Password</label>
        <input 
        className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="newpassword"  
        id="newpassword" 
        onChange={onNewChange}
        />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f5" htmlFor="conpassword">Confirm Password</label>
        <input 
        className="hover-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="conpassword"  
        id="conpassword"
        onChange={onConfirmChange} />
      </div>
      </fieldset>
    <div className="">
      <input 
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      onClick={onSubmit}
      type="submit" 
      value="Change" />
      <input 
      className="b ml2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      onClick={onHome}
      type="submit" 
      value="Cancel" />
    </div>
  </div>
</main>
</article>
    </>
  );
}

export default Changepass;