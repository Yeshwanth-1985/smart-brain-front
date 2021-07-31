import React, {useState} from 'react';
import { 
	Dropdown, 
	DropdownToggle, 
	DropdownMenu, 
	DropdownItem } from 'reactstrap';
import {useHistory} from "react-router-dom";

const Profileicon = (props) => {

let history = useHistory();

const [dropdownOpen, setDropdownOpen] = useState(false);

  const onSignout = () => {
    fetch('https://thawing-escarpment-40827.herokuapp.com/signout',{
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
    .then(response => response.json())
    .then(data => {
      if(data.signout) {
        localStorage.removeItem('token');
         history.push(process.env.PUBLIC_URL+"/");
      }
    })
    .catch(err => console.log(err))  
  }

  const onchangepass = () => {
        history.push(process.env.PUBLIC_URL+"/changepass");
  }
 
 const onHome = () => {
      history.push(process.env.PUBLIC_URL+"/home");
 }

 const onProfile = () => {
    props.togglemodal();
 }

  const toggle = () => setDropdownOpen(prevState => !prevState);

	return (
		<div className="pa4 tc">
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
        caret
      >
		  <img
	      src={`https://robohash.org/${props.userid}`}
      	  className="br-100 ba bg-black h3 w3 dib" alt="avatar" />
      </DropdownToggle>
      <DropdownMenu 
      	right
      	className='b--transparent shadow-25' 
      	style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
       <DropdownItem onClick={onHome}>Home</DropdownItem>
       <DropdownItem onClick={onProfile}>Profile</DropdownItem>
       <DropdownItem onClick={onchangepass}>Change Password</DropdownItem>
       <DropdownItem onClick={onSignout}>Sign Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
		</div>
	);
}

export default Profileicon;