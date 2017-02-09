import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';

import Quiz from '../components/quiz';
import TopScores from '../components/top_scores';


class TopicPage extends React.Component {
	constructor(props) {
		super(props);
		// takes the url, replaces the _ with white spaces and stores the result in this.state.quizName
		this.state = { quizName : (this.props.params.topic).replace(/_/g, " ") }

		// thanks to the url, retrieves the data from the database directly
		const firebaseRef = firebase.database().ref("/quizes/" + this.state.quizName);
		firebaseRef.once('value', (snapshot) => {
			console.log(snapshot.val());
		})

		// to be modified in order to store the category & topic from url
		// const category = this.props.category;
		// const topic = this.props.topic;
	}

	render() {
		return (
			<div className="row">
				{ this.state.quizName }
				<TopScores className="top-scores col-xs-6 col-sm-6 col-md-6 col-lg-6" />
				<Quiz className="quiz-container col-xs-6 col-sm-6 col-md-6 col-lg-6" />
			</div>
		)
	}
}





export default TopicPage;