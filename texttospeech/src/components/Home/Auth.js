import React from 'react';
import {useHistory} from "react-router-dom";

const Auth = (props) => {

let history = useHistory();

if(!props.user.name){
	if(localStorage.getItem("token")){
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
    }
    else {
    localStorage.removeItem("token");
      history.push(process.env.PUBLIC_URL+'/signin');
    }
    })
	}
	else {
		 history.push(process.env.PUBLIC_URL+'/signin');
	}
}
return (
	<>
	</>
	);
}

export default Auth;