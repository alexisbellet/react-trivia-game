import React from 'react';

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0,
			initialTimer: Date.now(),
			timePerQuestion: {}
		}
	}

	render() {
		return (
			<div className="quiz-container col-xs-6 col-sm-6 col-md-6 col-lg-6">
				{ this.props.questions.map( (question, index) => (
				<div key={index}
							className={ (index === this.state.currentQuestion) ? "active" : "hide" }>
							
					<h3>{ question.text }</h3>

					{ this.shuffledQuestion(index).map( (answer, index) => (
						<button key={index} 
										value={answer} 
										className="btn answer-btn" 
										onClick={ (evt) => this.checkCorrectness(evt.target.value, this.state.currentQuestion) } >
							{ answer }
						</button>
					) ) }
				</div>
				) ) }
			</div>
		)
	}

	shuffledQuestion(index) {
		// putting all the answers together in order to shuffle them
		let answers = [];
		this.props.questions[index].answers.incorrect.map((incorrectAnswer) => answers.push(incorrectAnswer));
		answers.push(this.props.questions[index].answers.correct);

		// shuffle method
		let currentIndex = answers.length;
		let temporaryValue; 
		let randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = answers[currentIndex];
			answers[currentIndex] = answers[randomIndex];
			answers[randomIndex] = temporaryValue;
		}

		return answers;
	}

	checkCorrectness(answer, index) {
		let correctAnswer = this.props.questions[index].answers.correct;
		if (answer === correctAnswer) {
			// create an object with a key/value pair - currentQuestion/time to answer
			let timePerQuestion = this.state.timePerQuestion;
			timePerQuestion[this.state.currentQuestion] = (Date.now() - this.state.initialTimer);
			console.log('timePerQuestion after correct answer', timePerQuestion);

			// update states
			this.setState({
				currentQuestion: (this.state.currentQuestion + 1),
				initialTimer: Date.now(),
				timePerQuestion: timePerQuestion
			});
		} else {
			console.log('wrong answer boooo');
		}
	}

}

export default Quiz;