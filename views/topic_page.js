import React from 'react';
import { Link } from 'react-router';

import Quiz from '../components/quiz';
import TopScores from '../components/top_scores';


// import all the components to compose the view

class TopicPage extends React.Component {
	constructor() {
		super();
		// to be modified in order to store the category & topic from url
		// const category = this.props.category;
		// const topic = this.props.topic;
	}

	render() {
		return (
			<div className="row">
				<TopScores className="top-scores col-xs-6 col-sm-6 col-md-6 col-lg-6" />
				<Quiz className="quiz-container col-xs-6 col-sm-6 col-md-6 col-lg-6" />
			</div>
		)
	}
}





export default TopicPage;