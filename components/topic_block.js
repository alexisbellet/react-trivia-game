import React from 'react';
import { Link } from 'react-router';

class TopicBlock extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<Link to="/topic">I am a topic bloc</Link>
			</div>
		)
	}
}

export default TopicBlock;