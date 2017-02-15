import React from 'react';
import firebase from 'firebase';

class TopScores extends React.Component {
	constructor() {
		super();

		this.state= {
			quizNames: '',
			user: ''
		}
	}

	render() {
		return (
			<aside className="top-scores col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div>
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">{this.user}</p>
				</div>
			</aside>
		)
	}

	componentDidMount(){
		const firebaseRef = firebase.database().ref('/user/');
		firebaseRef.once('value', (snapshot) => {
			this.setState({user: Object.keys(snapshot.val() )});
			console.log(snapshot.val());
		})
	}
}

export default TopScores;