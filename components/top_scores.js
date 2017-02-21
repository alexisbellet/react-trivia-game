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
			<div className="top-scores col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<p className="highScore--list  highScore--list__currentUser">You:</p>
				<div>
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">{this.props.user}</p>
				</div>
				<p className="highScore--list">High Scores:</p>
				<div>
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">No. 1 High Score</p>
				</div>
				<div>
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">No. 2 High Score</p>
				</div>
				<div>
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">No. 3 High Score</p>
				</div>
			</div>
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