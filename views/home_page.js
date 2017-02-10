import React from 'react';
import firebase from 'firebase';

import TopicBlock from '../components/topic_block';

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = { listOfQuizzes: [] };
	}

	componentDidMount() {
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

	render() {
		return (
			<div>
		  	<main>
					<div className="poster">
						<h2 className="poster--title">Welcome to Nerdia Tech Trivia</h2>
					</div>

					<div className="trivia">
						{ this.state.listOfQuizzes.map( (quiz) => (
								<TopicBlock key={quiz.name}
											quizDetails={quiz}
											className="trivia--game"
								/>
							)) }
					</div>
					
				</main>


			</div>
		)
	}
}

export default HomePage;


