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
	}

	render() {
		return (
		  	<div className="userDetails">
		  		<img className="userDetails--avatar" src="../assets/min-code-on-screen.jpg" alt="User Avatar"/>

		  		{
		  			!this.state.loggedIn ? <Login onLogin={ (userName) => this.login(userName) }/> :  <div><p> hi, {this.state.currentUser  } </p><button onClick={(evt) => { firebase.auth().signOut() }}>Logout</button></div>
		  		}

		  	</div>
		)
	}

	login(userName) {
	  this.setState({ loggedIn: true, currentUser: userName });
	}

	componentDidMount(){
	  firebase.auth().onAuthStateChanged(user => {
	    if (user) {
	      this.login(user.displayName, user.photoUrl);
	      console.log(user.photoUrl)
	    } else {
	      this.setState({loggedIn: false})
	    }
	  })
	}
}

export default UserDetails;