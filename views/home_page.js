import React from 'react';
import firebase from 'firebase';
import SearchForm from '../components/search_form';
import TopicBlock from '../components/topic_block';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			listOfQuizzes: [], 
			filterText: '',
			matchingTheSearch: false,
			currentUser: ''
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.findMatches = this.findMatches.bind(this);
		this.populateQuizArray = this.populateQuizArray.bind(this);
	}

	componentDidMount() {
		this.populateQuizArray();
	}

	// function fetching data from firebase to display available quizes
	populateQuizArray() {
		const firebaseRef = firebase.database().ref('quizzes');

		// loops through each quiz once and pushes it in listOfQuizzes
		let quizzes = [];
		firebaseRef.on('child_added', (snapshot) => {
			let quiz = {
				name: snapshot.key,
				details: snapshot.val()
			};
			quizzes.push(quiz);
			this.setState({ listOfQuizzes: quizzes });
			console.log(this.state.listOfQuizzes)
		});
	}

	// function linked to Search Form
	handleUserInput(filterText, matchingTheSearch) {
	    this.setState({
	      filterText: filterText,
	      matchingTheSearch: this.state.matchingTheSearch
	    });
	    // console.log('----inside handle---');
	    // console.log({
	    // 	list: this.state.listOfQuizzes,
	    // 	filter: this.state.filterText
	    // })
	    const matchArray = this.findMatches(filterText, this.state.listOfQuizzes);
	    console.log('matcharray length' + matchArray.length);
	    console.log(this.state.listOfQuizzes.length)

	    // if nothing is typed show everything
	    // if something is typed && there are matches display only those
	    // if there are no matches ask user to refine their search

	    if (matchArray.length >= 1) {
	    	console.log('a match exists');
	    	// this.props.matchingTheSearch = true;	
	    } else if (matchArray.length === this.state.listOfQuizzes.length) {
	    	console.log('display all quizzes')
	    	// this.props.matchingTheSearch = false;
	    }
	}

	findMatches(wordToMatch, quizzes){
	    // console.log({
	    // 	wordToMatch: wordToMatch,
	    // 	quizzes: quizzes
	    // })

		return quizzes.filter(quiz => {
			const rgex = new RegExp(wordToMatch, 'gi');
			console.log({quiz: quiz.name});
			return quiz.name.match(rgex);

		});
	} 

	render() {
		return (
			<div>
			  	<main>
					<div className="poster">
						<h2 className="poster--title">Welcome to Nerdia Tech Trivia</h2>
					</div>

					<SearchForm 
						filterText={this.state.filterText}
						matchingTheSearch={this.state.matchingTheSearch}
						onUserInput={this.handleUserInput} />

					<h3 className="welcome-message">
						Welcome to Nerdia, { !this.props.isUserLoggedIn ? "Guest" : this.state.currentUser }
					</h3>

					<div className="trivia">
						{ this.state.listOfQuizzes.map( (quiz) => (
								<TopicBlock key={quiz.name}
											quizDetails={quiz}
											isUserLoggedIn={ this.props.isUserLoggedIn }
								/>
							)) }
					</div>
				</main>
			</div>
		)
	}
}

export default HomePage;


