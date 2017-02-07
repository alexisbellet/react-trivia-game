import React from 'react';

import Header from '../components/header';

class AppLayout extends React.Component {
	constructor() {
		super();
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

export default AppLayout;