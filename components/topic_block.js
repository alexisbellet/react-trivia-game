import React from 'react';
import { Link } from 'react-router';

class TopicBlock extends React.Component {
	render() {
		return (
			<div>
				<Link className="trivia--game" 
							to={ this.props.isUserLoggedIn ? 
									("topic/" + (this.props.quizDetails.name).replace(/ /g, "-")) : 
									("log-in/" + (this.props.quizDetails.name).replace(/ /g, "-")) }>{ this.props.quizDetails.name }</Link>
			</div>
		)
	}
}

export default TopicBlock;