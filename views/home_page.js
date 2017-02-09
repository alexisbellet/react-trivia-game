import React from 'react';
import firebase from 'firebase';

import TopicBlock from '../components/topic_block';

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = { listOfQuizes: [] };
	}

	componentDidMount() {
		const firebaseRef = firebase.database().ref('quizes');

		// loops through each quiz once and pushes it in listOfQuizes
		var quizzes = [];
		firebaseRef.on('child_added', (snapshot) => {
			console.log('added: ', snapshot.val())
			let quiz = {
				name: snapshot.key,
				details: snapshot.val()
			};
			quizzes.push(quiz);
			this.setState({ listOfQuizes: quizzes });
			console.log('LIST', this.state.listOfQuizes);
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
						{ this.state.listOfQuizes.map( (quiz) => (
								<TopicBlock key={quiz.name}
														className="trivia--game"
														quizDetails={quiz}
								/>
							)) }
					</div>
					
				</main>


			</div>
		)
	}
}

export default HomePage;


