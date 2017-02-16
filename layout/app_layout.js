import React from 'react';

import Header from '../components/header';
// import HomePage from '../views/home_page';
// import TopicPage from '../views/topic_page';

class AppLayout extends React.Component {
	constructor() {
		super();
	}

	// we could potentially add a footer component if we want
	render() {
		return (
			<div className="row">
				<Header />
				{ this.props.children }
			</div>
		)
	}
}			

export default AppLayout;