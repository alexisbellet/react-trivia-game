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
			<div className="top-scores">
				<p className="highScore--list  highScore--list__currentUser">You:</p>
				<div className="highScore--User  highScore--User__thisUser">
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">{this.props.user}</p>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
				</div>
				<p className="highScore--list">High Scores:</p>
				<div className="highScore--User">
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">No. 1 High Score Username</p>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
				</div>
				<div className="highScore--User">
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">No. 2 High Score Username</p>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
				</div>
				<div className="highScore--User">
					<img src="" alt="User Avatar" className="userAvatar"/>
					<p className="display">No. 3 High Score Username</p>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount(){

		const firebaseRef = firebase.database().ref('/user/');
		firebaseRef.once('value', (snapshot) => {
			this.setState({user: Object.keys(snapshot.val() )});
			// console.log(snapshot.val());
		})
	}
}

export default TopScores;