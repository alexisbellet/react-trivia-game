import React from 'react';
import firebase from 'firebase';

class TopScores extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="top-scores">
				<p className="highScore--list  highScore--list__currentUser">You:</p>
				<div className="highScore--User  highScore--User__thisUser">
					<img src={ this.context.currentPhoto } alt="User Avatar" className="userAvatar"/>
					<p className="display">{ this.context.currentUserName }</p>
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
}

TopScores.contextTypes = {
	currentUserName: React.PropTypes.string,
	currentPhoto: React.PropTypes.string
}

export default TopScores;