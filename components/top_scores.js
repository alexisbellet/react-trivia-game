import React from 'react';
import firebase from 'firebase';

class TopScores extends React.Component {
	constructor() {
		super();

		this.state= {
			user: ''
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<h2>This is the top-score part</h2>
				</div>
			</div>
		)
	}

	componentDidMount(){
	  const firebaseRef = firebase.database().ref('user');
	  console.log(firebaseRef);
	  firebaseRef.on('child_added', (snapshot) => {
	  			let quiz = {
	  				name: snapshot.key,
	  				details: snapshot.val()
	  			};
	  			quizzes.push(quiz);
	  			this.setState({ listOfQuizzes: quizzes });
	  		});
	  	}
	}
}

export default TopScores;