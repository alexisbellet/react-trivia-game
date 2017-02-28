import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';

import Quiz from '../components/quiz';
import TopScores from '../components/top_scores';


class TopicPage extends React.Component {
	constructor() {
		super();
		this.state = {
			quizName: '',
			category: '',
			questions: [],
			perfectScore: 'a',
			userScore: 'b',
			highScores: { 'c':'d'}
		}
	}

	componentDidMount() {
		let quizName = (this.props.params.topic).replace(/-/g, " ");
		const firebaseRef = firebase.database().ref("/quizzes/" + quizName);

		firebaseRef.once('value', (snapshot) => {
			let category = snapshot.val().category;
			let questions = [];

			for (let i = 0; i < snapshot.val().questionList.length; i++) {
				questions.push(snapshot.val().questionList[i]);
			}

			this.setState({ 
				quizName: quizName, 
				category: category, 
				questions: questions });
		});
	}

	render() {
		return (
			<div className="col-12">
				<div className="row">
					<aside className="quiz-title  col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<h2 className="trivia--game">
							{ (this.props.params.topic).replace(/-/g, " ") }
						</h2>
						<TopScores 
							userScore={ this.state.userScore } 
							perfectScore={ this.state.perfectScore}
							highScores={ this.state.highScores}
							updateSharedScoreInfo={ this.updateSharedScoreInfo }
						/>
					</aside>
					<Quiz 
						questions={ this.state.questions }
						userScore={this.state.userScore }
						perfectScore={this.state.perfectScore}
						updateSharedScoreInfo={ this.updateSharedScoreInfo }
					/>
				</div>
			</div>
		)
	}

	updateSharedScoreInfo(sharedValue) {
		this.setState({userScore: sharedValue})

	}

}


export default TopicPage;