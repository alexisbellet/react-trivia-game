import React from 'react';
import firebase from 'firebase';

class SearchForm extends React.Component {
	goToQuiz(evt){
		evt.preventDefault();
		console.log(this.quizInput.value );
	}

	render() {
		return (
			<div>
		  		<form onSubmit={ this.goToQuiz.bind(this) }>
		  			<input type="search" ref={ (input) => {this.quizInput = input} }/>
		  			<input type="submit" value="Submit"/>
		  		</form>
	  		</div>
		)
	}
}

SearchForm.contextTypes = {
	router: React.PropTypes.object
}

export default SearchForm;