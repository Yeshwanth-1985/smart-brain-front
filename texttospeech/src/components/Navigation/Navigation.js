import React from 'react';
import Profileicon from '../Logo/Profileicon.js';
import {Link} from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';

const Navigation = (props) => {

  if(localStorage.getItem("token"))
  {
    return (
      <Nav style={{display: "flex", justifyContent: "flex-end"}}>
      <NavItem>
      <Profileicon userid={props.userid} onRouteChange={props.onRouteChange} isSignedin={props.isSignedin} togglemodal={props.togglemodal}/>
      </NavItem>
    </Nav>
      );
  }
  else {
    return (
      <>
<nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
  <Link className="navbar-brand" to={process.env.PUBLIC_URL + "/"}>Smart-Brain App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link f3 underline pa3 pointer" aria-current="page" to={process.env.PUBLIC_URL + "/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link f3 underline pa3 pointer" to={process.env.PUBLIC_URL + "/signin"}>Signin</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link f3 underline pa3 pointer" to={process.env.PUBLIC_URL + "/register"}>Regsiter</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
      );

  }
}


export default Navigation;