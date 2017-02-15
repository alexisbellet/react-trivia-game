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
			questions: []
		}
	}

	componentDidMount() {
		let quizName = (this.props.params.topic).replace(/-/g, " ");
		const firebaseRef = firebase.database().ref("/quizzes/" + quizName);

		firebaseRef.once('value', (snapshot) => {
			console.log('topicPage snapshot', snapshot.val());
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
			<div className="row">
				{ (this.props.params.topic).replace(/-/g, " ") }
				<TopScores className="top-scores col-xs-6 col-sm-6 col-md-6 col-lg-6" />
				<Quiz className="quiz-container col-xs-6 col-sm-6 col-md-6 col-lg-6" questions={ this.state.questions }/>
			</div>
		)
	}
}


export default TopicPage;