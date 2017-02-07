import React from 'react';
import { Link } from 'react-router';

// import CategoryBlock from '../components/category_block';


// import all the components to compose the view

class HomePage extends React.Component {

	render() {
		return (
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 poster">
					<h2 className="poster--title">Welcome to Nerdia Tech Trivia</h2>
				</div>
			</div>
		)
	}
}

export default HomePage;