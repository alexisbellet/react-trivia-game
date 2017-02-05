import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Quiz from '../components/quiz';
import TopScore from '../components/top_scores';


// import all the components to compose the view

class TopicPage extends React.Component {
	constructor() {
		super();
		// to be modified in order to store the category & topic from url
		const category = this.props.category;
		const topic = this.props.topic;
	}

	render() {
		return (
			<div className="row">
				<div className="details-container col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div className="row">
						<div className="quiz-details col-xs-12 col-sm-12 col-md-12 col-lg-12">
							{ this.category }
							{ this.topic }
						</div>
						<TopScores className="top-scores col-xs-12 col-sm-12 col-md-12 col-lg-12" />
					</div>
				</div>
				<Quiz className="quiz-container col-xs-6 col-sm-6 col-md-6 col-lg-6" /> 
			</div>
		)
	}
}

export default TopicPage;