import React from 'react';
import { Link } from 'react-router';

class PageNotFound extends React.Component {
	render() {
		return (
			<div className="page-not-found-container">
				<p>Oh no! It looks like you've gone off-path!</p>
				<p>For your safety, please head back to the <Link to="/">main page and check out our quizzes</Link>!</p>
			</div>
		)
	}
}

export default PageNotFound;