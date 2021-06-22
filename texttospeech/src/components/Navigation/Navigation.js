import React from 'react';

const Navigation = (props) => {

  if(props.isSignedin)
  {
    return (
      <nav style={{display: "flex", justifyContent: "flex-end"}}>
     <p onClick={() => props.onRouteChange('signin')} className="f3 link dim white underline pa3 pointer">Sign Out</p>
    </nav>
      );
  }
  else {
    return (
      <>
      <nav style={{display: "flex", justifyContent: "flex-end"}}>
     <p onClick={() => props.onRouteChange('signin')} className="f3 link dim white underline pa3 pointer">Login In</p>
     <p onClick={() => props.onRouteChange('register')} className="f3 link dim white underline pa3 pointer">Register</p>
    </nav>
    </>
      );

  }
}


export default Navigation;