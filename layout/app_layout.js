import React from 'react';

import Header from '../components/header';
// import HomePage from '../views/home_page';
// import TopicPage from '../views/topic_page';

class AppLayout extends React.Component {
	constructor() {
		super();
<<<<<<< HEAD
		
=======
>>>>>>> 9d3f1d4e487527c7a11cd27cedc596a3f05baab5
	}

	// we could potentially add a footer component if we want
	render() {
		return (
			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<Header />
				{ this.props.children }
			</div>
		)
	}
}

// 				

export default AppLayout;