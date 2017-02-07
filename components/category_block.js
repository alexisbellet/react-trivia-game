import React from 'react';
import { Router, Link } from 'react-router';

class CategoryBlock extends Router.Component {
	constructor() {
		super();
		// const props = this.props;
		// in case we have a function in here, don't forget to bind it
		// this.function = this.function.bind(this);

		// figure out how to implement :topic in router, where does it come from
	} 

	render() {
		return (
			<div className="category-block">
				<a href="/">This is a category-block</a>
			</div>
		)
	}

}

export default CategoryBlock;