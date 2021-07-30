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
      <Nav style={{display: "flex", justifyContent: "flex-end"}}>
     <NavItem><Link to="/"><p className="f3 link dim white underline pa3 pointer">Home</p></Link></NavItem>
     <NavItem><Link to="/signin"><p className="f3 link dim white underline pa3 pointer">Login In</p></Link></NavItem>
     <NavItem><Link to="/register"><p className="f3 link dim white underline pa3 pointer">Register</p></Link></NavItem>
    </Nav>
    </>
      );

  }
}


export default Navigation;