import React from 'react';
import Countdown from './countdown/countdown';
import firebase from 'firebase';
import { Link } from 'react-router';

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questionsWithShuffledAnswers: [],
      currentQuestion: 0,
      initialCountdownTime: 20,
      timePerQuestion: {},
      remainingTime: 20,
      hasUserAnswered: false,
      displayCorrectnessCorrect: false,
      totalScoreForQuiz: 0,
      correctAnswer: null,
      pointsThisQuestion: 0
    }
    this.checkCorrectness = this.checkCorrectness.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.advanceQuiz = this.advanceQuiz.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    // this.updateSharedScoreInfo = this.updateSharedScoreInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.questions) {
			this.shuffleAnswers(nextProps.questions);
		}
	}

	displayQuiz() {
		const { questionsWithShuffledAnswers, 
						currentQuestion, 
						remainingTime, 
						hasUserAnswered, 
						timePerQuestion,
						pointsThisQuestion } = this.state;

		if (questionsWithShuffledAnswers.length < 1) {
			return (<div>Quiz is loading...</div>)
		} else if ( questionsWithShuffledAnswers.length < (currentQuestion + 1) ){
			return(
					<div className="">
						<h3>Your final score is { this.state.totalScoreForQuiz }</h3>
						<Link to="/">Return to all Quizzes</Link>
					</div>
				)
		} else {
			return (questionsWithShuffledAnswers.map((question, i) => {
				
				return (
					<div key={i}
							 className={ (i === currentQuestion) ? "active" : "hide" }>
						
						<h3> { question.text } </h3>
						
						{ question.answers.map( (answer, index) => (
							<button key={index} 
											value={answer} 
											disabled={ hasUserAnswered }
											className={answer + " btn answer-btn"}
											onClick={ (evt) => this.checkCorrectness(evt.target.value, currentQuestion) } >
								{ answer }
							</button>
						) ) }

						{ hasUserAnswered === true && this.state.displayCorrectnessCorrect === true ? 
								<div>
									<p>you answered the question correctly, you get {pointsThisQuestion} points</p> 
									<p>your score is { this.state.totalScoreForQuiz }</p> 
									<button onClick={(evt) => this.advanceQuiz(evt.target.value, currentQuestion)}>Next Question</button>
								</div>
							: null }
						{ hasUserAnswered === true && this.state.displayCorrectnessCorrect === false ? 
								<div>
									<p>you answered the question incorrectly. You get 0 new points...</p>
									<p>the correct answer is {this.state.correctAnswer}</p> 
									<p>your score is { this.state.totalScoreForQuiz }</p> 
									<button onClick={(evt) => this.advanceQuiz(evt.target.value, currentQuestion)}>Next Question</button>
								</div>
							: null }	
					</div>
				)}
			))
		}
	}

	render() {
		const { questionsWithShuffledAnswers, 
						currentQuestion, 
						remainingTime, 
						hasUserAnswered, 
						timePerQuestion, 
						totalScoreForQuiz,
						pointsThisQuestion } = this.state;

		// displaying container for "content"
		return (
			<main className="quiz-container col-xs-9 col-sm-9 col-md-9 col-lg-9" >
				{ this.displayQuiz() }

				{ hasUserAnswered ?
					(<div className="hide"></div>) :
					(<Countdown currentQuestion={ currentQuestion }
									 		amountOfQuestions= { questionsWithShuffledAnswers.length }
									 		remainingTime={ remainingTime } 
									 		updateTimer={ this.updateTimer } 
									 		checkCorrectness={ this.checkCorrectness }
									 		timePerQuestion={ timePerQuestion }/>) }
			</main>
		)
	}

	calculateScore(allPoints){
		allPoints = Object.values(allPoints);
		allPoints = allPoints.map(Number);

		let streakArray = [];

		allPoints = allPoints.map((num, i) => {
			if (num === 0) {
				streakArray = [];
			} else {

				if (streakArray.length == 0 ) { // there is no streak so stays
					streakArray.push(num);
					// console.log('no streak length is' + streakArray.length + ' so num is ' + num, );

				} else if (streakArray.length !== 0){ // streak so multiply
					streakArray.push(num);
					let newMultiplier = ((streakArray.length * 2) / 10) + 1;
					num = (num * newMultiplier);
					// console.log('mult ' + newMultiplier);
				}
			}
			return Math.round(num);
		});

		const result = allPoints.reduce((a, b) => a + b, 0);
		const pointsThisQuestion = allPoints[allPoints.length-1];
		// console.log(allPoints + ' add up to the all points ' + result);

		this.setState({
			totalScoreForQuiz: result,
			pointsThisQuestion: pointsThisQuestion
		}) ;
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
			hasUserAnswered: true,
			correctAnswer: correctAnswer
		});
	}

	advanceQuiz(index, currentQuestion){
		// move advancing quiz by updating state here so it can be called when appropriate
		this.setState({
			currentQuestion: (currentQuestion + 1),
			remainingTime: this.state.initialCountdownTime,
			hasUserAnswered: false
		})
	}

	checkCorrectness(answer, index) {
		const { timePerQuestion, currentQuestion, remainingTime } = this.state;
		let correctAnswer = this.props.questions[index].answers.correct;

		this.displayCorrectAnswer(correctAnswer);

		// for each this.props.question we need an object that has the max number aka remainingTime
		// this.calculateScore(perfectScore);

		// if the correct answer is chosen, pair the remaining time 
		// and the question index in an object and add it to timePerQuestion object
		if (answer === correctAnswer) {
			timePerQuestion[index] = remainingTime;
			this.setState({
				timePerQuestion: timePerQuestion,		
				displayCorrectnessCorrect: true
			});
			this.calculateScore(timePerQuestion);

		} else {
		// else if the wrong answer is chosen, pair 0 with the question index
		// and add it to timePerQuestion object
			timePerQuestion[index] = 0;
			this.setState({
				timePerQuestion: timePerQuestion
			});
			this.calculateScore(timePerQuestion);
		}
	}

	componentDidUpdate(){

		this.updateSharedScoreInfo(this.state.totalScoreForQuiz);
	}
}

export default Quiz;