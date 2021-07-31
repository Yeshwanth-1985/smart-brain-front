import React,{useState} from 'react';
import './Profile.css';

const Profile = (props) => {

const [username, setusername] = useState(props.user.name);

const onChangeUsername = (e) => {
	setusername(e.target.value);
}

const updateprofile = () => {
	if(username !== props.user.name) {
		fetch(`https://thawing-escarpment-40827.herokuapp.com/profile/${props.user.id}`,{
      method: 'post',
      headers: {
      	'Content-type': 'application/json',
      	'authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: username
        })
    })
	.then(response => response.json())
	.then(data => {
		if(data.success) {
			props.togglemodal();
			props.loaduser(data.user);
			alert("username successfully updates");
		}
		else {
			alert("error while updating the data");
		}
	})
	.catch(err => console.log(err));
	}
	else {
		alert("username remains same");
	} 
}

	return ( 
		<div className='profile-modal'>
    <div className="card mywidth">
  <div className="card-body">
    	<div className='modal-close'>
    	<img
	      src={`https://robohash.org/${props.user.id}`}
      	  className="br-100 bg-black ba h3 w3 dib" alt="avatar" />
      	  <h1 className='close-text' onClick={props.togglemodal}>&times;</h1>
      	 </div> 
      	  <h1>{username}</h1>
      	  <h4>Images Submitted: {props.user.entries}</h4>
      	  <p>Member Since: {new Date(props.user.joined).toLocaleDateString()}</p>
      	<label className='mt2 fw6' htmlFor="user-name">Name:</label>
        <input 
        className="pa2 ba w-100"
        placeholder={props.user.name} 
        type="text" 
        onChange={onChangeUsername}
        name="user-name"  
        id="user-name" 
        />
        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
        	<button 
        	className='btn btn-primary'
        	onClick={updateprofile}
        	>
        	Save
        	</button>
        	<button 
        	className='btn btn-danger'
        	onClick={props.togglemodal}
        	>
        	Cancel
        	</button>
        </div>
        </div>
</div>
		</div>
		);
}

export default Profile;