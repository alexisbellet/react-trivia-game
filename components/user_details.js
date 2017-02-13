import React from 'react';
import firebase from 'firebase';
import Login from './login';


class UserDetails extends React.Component {
	constructor() {
	  super()
	  this.state = {
	    currentUser: null,
	    loggedIn: false
	  }
	  // this.login = this.login.bind(this);
	}

	render() {
		return (
		  	<div className="userDetails">
		  		<img className="userDetails--avatar" src="../assets/min-code-on-screen.jpg" alt="User Avatar"/>

		  		{
		  			!this.state.loggedIn ? <Login onLogin={ (userName) => this.login(userName) }/> :  this.state.currentUser 
		  		}

		  	</div>
		)
	}

	login(userName) {
	  this.setState({ loggedIn: true, currentUser: userName });
	}
}

export default UserDetails;