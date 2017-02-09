import React from 'react';
import firebase from 'firebase';

import TopicBlock from '../components/topic_block';

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = { listOfQuizes: [] };
	}

	componentWillMount() {
		const firebaseRef = firebase.database().ref('quizes');

		// loops through each quiz once and pushes it in listOfQuizes
		firebaseRef.on('child_added', (snapshot) => {
			let listOfQuizes = this.state.listOfQuizes;
			let quiz = {
				name: snapshot.key,
				details: snapshot.val()
			};
			this.setState({ listOfQuizes: listOfQuizes.concat(quiz) });
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


