import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';

class SearchForm extends React.Component {
	constructor() {
		super();
		this.handleChangeMatches = this.handleChangeMatches.bind(this);
	}

	handleChangeMatches(){
		this.props.onUserInput(this.filterTextInput.value);
	}

	render() {
		return (
			<div className="search-wrapper">
				<input type="search" 
					   value={this.props.filterText} 
					   ref={(input) => this.filterTextInput = input}
					   onChange={this.handleChangeMatches} 
					   placeholder="Search Quizzes by Name"/>
	  		</div>
		)
	}
}

SearchForm.contextTypes = {
	router: React.PropTypes.object
}

export default SearchForm;