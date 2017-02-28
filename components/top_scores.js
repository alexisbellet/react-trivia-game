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

			this.setState({
				bestPlayers: bestPlayers.reverse()
			});
		}	
	}

	render() {
		return (
			<div className="top-scores">
				<p className="highScore--list  highScore--list__currentUser">So far, your current best score for this quiz is:</p>
				<div className="highScore--User  highScore--User__thisUser">
					<div className="user--identifier">
						<img src={ this.context.currentPhoto } alt="User Avatar" className="userAvatar"/>
						<p className="display">{ this.context.currentUserName }</p>
					</div>
					<div className="scoreProgress">
						<div className="scoreProgress--filled"></div>
						<p className="score-display">{ this.props.userHighestScore }</p>
					</div>
				</div>
				

				<h4 className="highScore--list">
					{ this.state.bestPlayers.length < 1 ? "There are currently no top scorer for this quiz, be the first!" : "Here are the top scorers for this quiz!" }
				</h4>

				{ this.state.bestPlayers.map((user, index) => {
					return (
						<div className="highScore--User" key={index}>
							<div className="user--identifier">
								<img src={ user.avatar } alt="User Avatar" className="userAvatar"/>
								<p className="display">{ user.name }</p>
							</div>
							<div className="scoreProgress">
								<div className="scoreProgress--filled"></div>
								<p className="score-display">{ user.score }</p>
							</div>
						</div>
					)
				}) }

			</div>
		)
	}
}

TopScores.contextTypes = {
	currentUserName: React.PropTypes.string,
	currentPhoto: React.PropTypes.string
}

export default TopScores;