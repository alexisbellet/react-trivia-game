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
			listOfMatchedQuizzes: [],
			currentUser: ''
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.findMatches = this.findMatches.bind(this);
		this.populateQuizArray = this.populateQuizArray.bind(this);
	}

	componentDidMount() {
		this.populateQuizArray();
	}

	// function fetching data from firebase to display available quizzes
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
		});
	}

	// function linked to Search Form
	handleUserInput(filterText, matchingTheSearch) {
	    this.setState({
	      filterText: filterText,
	      matchingTheSearch: this.state.matchingTheSearch
	    });

	    const matchArray = this.findMatches(filterText, this.state.listOfQuizzes);
    	this.setState({matchingTheSearch: true, listOfMatchedQuizzes: [...matchArray]});

	    // if nothing is typed show everything
	    // if something is typed && there are matches display only those
	    // if there are no matches ask user to refine their search
	    if (matchArray.length === this.state.listOfQuizzes.length) {
	    	this.setState({matchingTheSearch: false});
	    } else if (matchArray.length >= 1 ) {
	    	//
	    } else if (matchArray.length === 0 ) {
			this.setState({matchingTheSearch: 'no match'});
	    }	
	}

	findMatches(wordToMatch, quizzes){
		return quizzes.filter(quiz => {
			const rgex = new RegExp(wordToMatch, 'gi');
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

						{ this.state.matchingTheSearch == true ? 
							this.state.listOfMatchedQuizzes.map( (quiz) => (
								<TopicBlock key={quiz.name}
											quizDetails={quiz}
											isUserLoggedIn={ this.props.isUserLoggedIn }
								/>
							))
							: // else
							this.state.listOfQuizzes.map( (quiz) => (
								<TopicBlock key={quiz.name}
											quizDetails={quiz}
											isUserLoggedIn={ this.props.isUserLoggedIn }
								/>
							))
						 }
					</div>
				</main>
			</div>
		)
	}
}

export default HomePage;


