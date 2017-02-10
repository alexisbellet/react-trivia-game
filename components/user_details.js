import React from 'react';

class UserDetails extends React.Component {
	render() {
		return (
		  	<div className="userDetails">
		  		<img className="userDetails--avatar" src="../assets/min-code-on-screen.jpg" alt="User Avatar"/>
		  		<p className="userName">lisa</p>
		  	</div>
		)

	}
}

export default UserDetails;