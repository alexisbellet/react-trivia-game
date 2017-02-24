import React from 'react';
import Countdown from './countdown/countdown';

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questionsWithShuffledAnswers: [],
      currentQuestion: 0,
      initialCountdownTime: 20,
      timePerQuestion: {},
      remainingTime: 20
    }
    this.checkCorrectness = this.checkCorrectness.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.questions) {
			this.shuffleAnswers(nextProps.questions);
		}
	}

	render() {
		const {questionsWithShuffledAnswers, currentQuestion, remainingTime} = this.state;
		let content = null;

		// if shuffleAnswer function finished running, display questions
		questionsWithShuffledAnswers.length < 1 ?
		content = "Quiz is loading" : 
		content = questionsWithShuffledAnswers.map((question, i) => {
			return (
				<div key={i}
						 className={ (i === currentQuestion) ? "active" : "hide" }>
					
					<h3> { question.text } </h3>
					
					{ question.answers.map( (answer, index) => (
						<button key={index} 
										value={answer} 
										className="btn answer-btn" 
										onClick={ (evt) => this.checkCorrectness(evt.target.value, currentQuestion) } >
							{ answer }
						</button>
					) ) }

					<Countdown remainingTime={ remainingTime } 
										 updateTimer={ this.updateTimer } />
				</div>
			)
		});

		// displaying container for "content"
		return (
			<main className="quiz-container col-xs-9 col-sm-9 col-md-9 col-lg-9" >
				{content}
			</main>
		)
	}

	shuffleAnswers(questions) {
		const length = questions.length;
		// putting all the answers together in order to shuffle them
		let questionsWithShuffledAnswers = [];

		// this part is necessary so that when component first mounts, the code does not break
		if (length < 1) {
			return;
		} else {
			// loop through all the questions and shuffle the answers
			for (let i = 0; i < length; i++) {
				let shuffledAnswers = [];
				let currentQuestion = questions[i].text;
				let currentSetOfAnswers = questions[i].answers;

				// push all the current answers into shuffledAnswers array
				currentSetOfAnswers.incorrect.map((incorrectAnswer) => shuffledAnswers.push(incorrectAnswer));
				shuffledAnswers.push(currentSetOfAnswers.correct);

				// shuffle shuffledAnswers array 
				let currentIndex = shuffledAnswers.length;
				let temporaryValue; 
				let randomIndex;

				// While there remain elements to shuffle...
				while (0 !== currentIndex) {

					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					// And swap it with the current element.
					temporaryValue = shuffledAnswers[currentIndex];
					shuffledAnswers[currentIndex] = shuffledAnswers[randomIndex];
					shuffledAnswers[randomIndex] = temporaryValue;
				}

				// pushes an object containing the shuffledAnswers & the question into the questionsWithShuffledAnswers array
				questionsWithShuffledAnswers.push({
					text: currentQuestion,
					answers: shuffledAnswers
				});
			}

			this.setState({
				questionsWithShuffledAnswers: questionsWithShuffledAnswers 
			});
		}
	}

	updateTimer(newTime) {
		this.setState({
			remainingTime: newTime
		});
	}

	checkCorrectness(answer, index) {
		let correctAnswer = this.props.questions[index].answers.correct;
		if (answer === correctAnswer) {
			// update states
			this.setState({
				currentQuestion: (this.state.currentQuestion + 1),
			});
		} else {
			console.log('wrong answer boooo');
		}
	}

}

export default Quiz;