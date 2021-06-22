import React, {useState} from 'react';


const Signin = (props) => {

const onEmailChange = (event) => {
  setemail(event.target.value);
}

const onPasswordChange = (event) => {
  setpassword(event.target.value);
}

const onSubmit = () => {
  
  if(signinemail && signinpassword  && signinemail.includes('@') && signinemail.includes('.com'))
  {
  fetch('https://thawing-escarpment-40827.herokuapp.com/signin',{
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: signinemail,
        password: signinpassword
        })
    })
  .then(response => response.json())
  .then(data => {
    if(data.id){
      props.loaduser(data);
      props.onRouteChange('home');
    }
    else{
      props.onRouteChange('signin');
      alert("Unable to signin,try again");
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
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address" 
        onChange={onEmailChange} 
        id="email-address" />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
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
      <p onClick={() => props.onRouteChange('register')} className="pointer f4 link dim black db">Register</p>
    </div>
  </div>
</main>
</article>
    </>
  );
}


export default Signin;