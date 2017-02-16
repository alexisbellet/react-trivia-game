import React from 'react';
import firebase from 'firebase';

class TopScores extends React.Component {
	constructor() {
		super();

		this.state= {
			user: ''
		}
	}

	render() {
		return (
			<div className="top-score-container col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<h2>This is the top-score part</h2>
			</div>
		)
	}

	componentDidMount(){
	  const firebaseRef = firebase.database().ref('user');
	  console.log(firebaseRef);
	}
}

export default TopScores;