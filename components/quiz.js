import React from 'react';

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					{ this.props.questions.map( (question, index) => (
							<div key={index}
									 className={ (index === this.state.currentQuestion) ? "active" : "hide" }>
								
								{ question.text }

								{ this.shuffledQuestion(index).map( (answer, index) => (
										<button key={index} 
														value={answer} 
														className="btn" 
														onClick={ (evt) => this.checkCorrectness(evt.target.value, this.state.currentQuestion) } >
											{ answer }
										</button>
									) ) }

							</div>
					) ) }
				</div>
			</div>
		)
	}

	shuffledQuestion(index) {
		// putting all the answers together in order to shuffle them
		let answers = [];
		answers.push(this.props.questions[index].answers.incorrect);
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
			console.log('yay!');
			this.setState({currentQuestion: (this.state.currentQuestion + 1)})
		} else {
			console.log('boooo');
		}
	}

}

export default Quiz;