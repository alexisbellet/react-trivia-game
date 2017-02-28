import React from 'react';
import { Link } from 'react-router';

class TopicBlock extends React.Component {
	render() {
		// shorten the path to quizDetails & isUserLoggedIn
		const { quizDetails, isUserLoggedIn } = this.props;
		return (
			<div className="trivia--game">
				<div className="categoryTitle">{quizDetails.details.category}</div>
				<div className="topic-link-container">
					<Link to={ isUserLoggedIn ? 
						("/topic/" + (quizDetails.name).replace(/ /g, "-")) : 
						("/log-in?topic=" + (quizDetails.name).replace(/ /g, "-")) }>{ quizDetails.name }</Link>
				</div>
			</div>
		)
	}
}

export default TopicBlock;