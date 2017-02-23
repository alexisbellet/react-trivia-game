import React from 'react';
import firebase from 'firebase';


class UserDetails extends React.Component {
	constructor() {
	  super()
	  this.logout = this.logout.bind(this);
	}

	render() {
		return (
	  	<div className="userDetails">
	  		<img className="userDetails--avatar" src={this.props.avatar} alt="User Avatar"/>
	  		<div>
	  			<p> Wanna log out already? </p>
	  			<button onClick={(evt) => { this.logout(evt.target) }}>Logout</button>
	  		</div>
	  	</div>
		)
	}

	logout() {
		this.props.closeDetails();
		firebase.auth().signOut();

	// login(userName) {
	//   this.setState({ loggedIn: true, currentUser: userName });
	// }

	// componentDidMount(){
	//   firebase.auth().onAuthStateChanged(user => {
	//     if (user) {
	//       this.login(user.displayName, user.photoUrl);
	//       // console.log('the users photo url is ' + user.photoUrl)
	//     } else {
	//       this.setState({loggedIn: false})
	//     }
	//   })

	}
}

export default UserDetails;