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
      remainingTime: 20,
      displayCorrectness: false,
      displayCorrectnessCorrect: false,
      totalScoreForQuiz: 0,
      correctAnswer: null
    }
    this.checkCorrectness = this.checkCorrectness.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.advanceQuiz = this.advanceQuiz.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.questions) {
			this.shuffleAnswers(nextProps.questions);
		}
	}

	render() {
		const {questionsWithShuffledAnswers, currentQuestion, remainingTime, displayCorrectness, timePerQuestion } = this.state;
		let content = null;

		// if shuffleAnswer function finished running, display questions
		questionsWithShuffledAnswers.length < 1 ?
		content = ("Quiz is loading...") : 
		content = questionsWithShuffledAnswers.map((question, i) => {
			return (
				<div key={i}
						 className={ (i === currentQuestion) ? "active" : "hide" }>
					
					<h3> { question.text } </h3>
					
					{ question.answers.map( (answer, index) => (
						<button key={index} 
										value={answer} 
										disabled={displayCorrectness}
										className={answer + " btn answer-btn"}
										onClick={ (evt) => this.checkCorrectness(evt.target.value, currentQuestion) } >
							{ answer }
						</button>
					) ) }

					{ displayCorrectness === true && this.state.displayCorrectnessCorrect === true ? 
							<div>
								<p>you answered the question correctly, you get {timePerQuestion[i]} points</p> 
								<button onClick={(evt) => this.advanceQuiz(evt.target.value, currentQuestion)}>Next Question</button>
							</div>
						: null }
					{ displayCorrectness === true && this.state.displayCorrectnessCorrect === false ? 
							<div>
								<p>you answered the question incorrectly</p>
								<p>the correct answer is {this.state.correctAnswer}</p> 
								<button onClick={(evt) => this.advanceQuiz(evt.target.value, currentQuestion)}>Next Question</button>
							</div>
						: null }	

				</div>
			)
		});

		// displaying container for "content"
		return (
			<main className="quiz-container col-xs-9 col-sm-9 col-md-9 col-lg-9" >
				{content}

				<Countdown currentQuestion={ currentQuestion }
									 amountOfQuestions= { questionsWithShuffledAnswers.length }
									 remainingTime={ remainingTime } 
									 updateTimer={ this.updateTimer } />
			</main>
		)
	}

	shuffleAnswers(questions) {
		const length = questions.length;
		// putting all the answers together in order to shuffle them
		let questionsWithShuffledAnswers = [];

		// the if statement part is necessary so that when component first mounts, the code does not break
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

				// push an object containing the shuffledAnswers & the question into the questionsWithShuffledAnswers array
				questionsWithShuffledAnswers.push({
					text: currentQuestion,
					answers: shuffledAnswers
				});
			}

			// update questionsWithShuffledAnswers and reset the countdown to initial time
			this.setState({
				questionsWithShuffledAnswers: questionsWithShuffledAnswers,
				remainingTime: this.state.initialCountdownTime
			})
		}
	}

	updateTimer(newTime) {
		this.setState({
			remainingTime: newTime
		});
	}

	displayCorrectAnswer(correctAnswer){
		this.setState({
			displayCorrectness: true,
			correctAnswer: correctAnswer
		});
	}

	advanceQuiz(index, currentQuestion){
		// move advancing quiz by updating state here so it can be called when appropriate
		this.setState({
			currentQuestion: (currentQuestion + 1),
			remainingTime: this.state.initialCountdownTime,
			displayCorrectness: false
		})
	}

	checkCorrectness(answer, index) {
		const { timePerQuestion, currentQuestion, remainingTime } = this.state;
		let correctAnswer = this.props.questions[index].answers.correct;

		this.displayCorrectAnswer(correctAnswer);

		// if the correct answer is chosen, pair the remaining time 
		// and the question index in an object and add it to timePerQuestion object
		if (answer === correctAnswer) {
			timePerQuestion[index] = remainingTime;
			this.setState({
				timePerQuestion: timePerQuestion,		
				displayCorrectnessCorrect: true
			});
			// this.advanceQuiz(currentQuestion);

		} else {
		// else if the wrong answer is chosen, pair 0 with the question index
		// and add it to timePerQuestion object
			timePerQuestion[index] = 0;
			this.setState({
				timePerQuestion: timePerQuestion
			});
			// this.advanceQuiz(currentQuestion);
		}

		console.log('quiz.js: here are the times per question: ', timePerQuestion);
	}

}

export default Quiz;