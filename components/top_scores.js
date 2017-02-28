import React from 'react';
import firebase from 'firebase';

class TopScores extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bestPlayers: []
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.quizName) {
			// if quizName is passed as props, retrieve the three best players for this quiz and 
			// store them in this.state.bestPlayers
			const firebaseRef = firebase.database().ref("/quizzes/" + nextProps.quizName + "/scores");
			let bestPlayers = [];
			firebaseRef.orderByChild("score").limitToLast(3).on('value', (snapshot) => {
				snapshot.forEach(function(data) {
					bestPlayers.push(data.val());
  			});
			});

			console.log('here"s an array of the best players for this quiz', bestPlayers);
			this.setState({
				bestPlayers: bestPlayers
			});
		}	
	}

	render() {
		return (
			<div className="top-scores">
				<p className="highScore--list  highScore--list__currentUser">You:</p>
				<div className="highScore--User  highScore--User__thisUser">
					<div className="user--identifier">
						<img src={ this.context.currentPhoto } alt="User Avatar" className="userAvatar"/>
						<p className="display">{ this.context.currentUserName }</p>
					</div>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
					<p>{ this.props.userHighestScore }</p>
				</div>
				<p className="highScore--list">High Scores:</p>
				<div className="highScore--User">
					<div className="user--identifier">
						<img src="" alt="User Avatar" className="userAvatar"/>
						<p className="display">No. 1 Score Username</p>
					</div>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
				</div>
				<div className="highScore--User">
					<div className="user--identifier">
						<img src="" alt="User Avatar" className="userAvatar"/>
						<p className="display">No. 3 Score Username</p>
					</div>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
				</div>
				<div className="highScore--User">
					<div className="user--identifier">
						<img src="" alt="User Avatar" className="userAvatar"/>
						<p className="display">No. 3 Score Username</p>
					</div>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
					</div>
				</div>
			</div>
		)
	}
}

TopScores.contextTypes = {
	currentUserName: React.PropTypes.string,
	currentPhoto: React.PropTypes.string
}

export default TopScores;