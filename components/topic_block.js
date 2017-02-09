import React from 'react';
import { Link } from 'react-router';

class TopicBlock extends React.Component {
	render() {
		return (
			<div>
				<Link className="trivia--game" to={ "topic/" + (this.props.quizDetails.name).replace(/ /g, "_") }>{ this.props.quizDetails.name }</Link>
			</div>
		)
	}
}

export default TopicBlock;