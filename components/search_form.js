import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';

class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	quizNames: []
		// }
		this.handleChangeMatches = this.handleChangeMatches.bind(this);
	}

	// componentDidMount(){
	// 	const firebaseRef = firebase.database().ref("/quizzes/");
	// 	firebaseRef.once('value', (snapshot) => {
	// 		this.setState({quizNames: Object.keys(snapshot.val() )});
	// 	})
	// }

	handleChangeMatches(){
		this.props.onUserInput(this.filterTextInput.value);
		// const matchArray = findMatches(this.filterTextInput.value, this.state.quizNames);
		// // console.log(this.filterTextInput.value, this.state.quizNames);

		// function findMatches(wordToMatch, quizzes){
		// 	// console.log(wordToMatch, quizzes);
		// 	  return quizzes.filter(quiz => {
		// 	    const rgex = new RegExp(wordToMatch, 'gi');
		// 	    return quiz.match(rgex);
		// 	  });
		// } 
		// console.log(matchArray);
		// console.log(this.props);

	}

	render() {
		return (
			<div className="search-wrapper">
				<input type="search" 
					   value={this.props.filterText} 
					   ref={(input) => this.filterTextInput = input}
					   onChange={this.handleChangeMatches} 
					   placeholder="Search Quizzes"/>
	  		</div>
		)
	}
}

SearchForm.contextTypes = {
	router: React.PropTypes.object
}

export default SearchForm;