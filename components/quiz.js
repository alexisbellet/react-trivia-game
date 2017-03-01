import React from 'react';
import Countdown from './countdown/countdown';
import firebase from 'firebase';
import { Link } from 'react-router';

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasQuizStarted: false,
			questionsWithShuffledAnswers: [],
      currentQuestion: 0,
      initialCountdownTime: 20,
      remainingTime: 20,
      hasUserAnswered: false,
      hasAnsweredCorrectly: false,
      correctAnswer: null,
      pointsThisQuestion: 0,
      timePerQuestion: {},
      totalScoreForQuiz: 0,
      perfectScoreForQuiz: 0
    }
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.checkCorrectness = this.checkCorrectness.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.advanceQuiz = this.advanceQuiz.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.questions) {
			this.shuffleAnswers(nextProps.questions);
		}
	}

	prepareForQuiz() {
		return (
			<div className="prepare-for-quiz">
				<h3>Ready to start the quiz?</h3>
				<button className="btn" onClick={ () => this.startQuiz() }>Click here!</button>
			</div>
		)
	}

	displayQuiz() {
		const { questionsWithShuffledAnswers, 
						currentQuestion, 
						remainingTime, 
						hasUserAnswered, 
						timePerQuestion,
						pointsThisQuestion,
						hasAnsweredCorrectly,
						totalScoreForQuiz } = this.state;

		if (questionsWithShuffledAnswers.length < 1) {
			return (<div>Quiz is loading...</div>)

		} else if ( questionsWithShuffledAnswers.length < (currentQuestion + 1) ) {
			return (
					<div className="prepare-for-quiz">
						<h3>Your final score is { totalScoreForQuiz }</h3>
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

						{ hasUserAnswered === true ?
								<div>
									{ hasAnsweredCorrectly === true ? 
										<p>You answered the question correctly, you get {pointsThisQuestion} points</p> :
										<p>You answered the question incorrectly. You get 0 new points...</p> }
									<p>Your score is { totalScoreForQuiz }</p> 
									<button onClick={(evt) => this.advanceQuiz(evt.target.value, currentQuestion)}>Next Question</button>
								</div>
							: null }
					</div>
				)}
			))
		}
	}

	render() {
		const { hasQuizStarted,
						hasUserAnswered, 
						currentQuestion,
						questionsWithShuffledAnswers, 
						remainingTime, 
						timePerQuestion } = this.state;

		// before the quiz starts, display a welcome screen and ask the user for action to start the quiz
		return (
			<main className="quiz-container col-xs-9 col-sm-9 col-md-9 col-lg-9" >
				{ hasQuizStarted ? this.displayQuiz() : this.prepareForQuiz() }

				{ hasUserAnswered || !hasQuizStarted ?
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

	startQuiz() {
		this.setState({
			hasQuizStarted: true
		});
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
				hasAnsweredCorrectly: true
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

	updateTimer(newTime) {
		this.setState({
			remainingTime: newTime
		});
	}

	componentDidUpdate() {
		// if the quiz is over checks whether userHighestScore passed as props is higher than
		// the new total score, if it isn't or that userHighestScore is 0, updates firebase with userHighestScore
		if (this.state.currentQuestion === this.state.questionsWithShuffledAnswers.length && 
				this.state.questionsWithShuffledAnswers.length > 0) {
			console.log('totalScoreForQuiz', this.state.totalScoreForQuiz);
			console.log('userHighestScore', this.props.userHighestScore);
			if (this.state.totalScoreForQuiz > this.props.userHighestScore || this.props.userHighestScore === 0) {
				this.props.setUserHighestScore(this.state.totalScoreForQuiz);		
				this.props.setPerfectScore(this.state.perfectScoreForQuiz);
			}
		}
	}

	calculateScore(allPoints){
		allPoints = Object.values(allPoints);
		allPoints = allPoints.map(Number);
		const pointsLength = allPoints.length;

		let streakArray = [];

		allPoints = allPoints.map((num, i) => {
			if (num === 0) {
				streakArray = [];
			} else {

				if (streakArray.length == 0 ) { // there is no streak so stays
					streakArray.push(num);

				} else if (streakArray.length !== 0){ // streak so multiply
					streakArray.push(num);
					let newMultiplier = ((streakArray.length * 2) / 10) + 1;
					num = (num * newMultiplier);

				}
				let perfectNum;

				if (i === 0) {
					perfectNum = 20;
				} else {
					perfectNum = (((pointsLength - 1) * 2) / 10) + 1;
					perfectNum = (20 * perfectNum);
				}
				this.setState({
					perfectScoreForQuiz: perfectNum,
				});
			}
			return Math.round(num);
		});

		const result = allPoints.reduce((a, b) => a + b, 0);
		const pointsThisQuestion = allPoints[allPoints.length-1];
		// console.log(allPoints + ' add up to the all points ' + result);

		this.setState({
			totalScoreForQuiz: result,
			pointsThisQuestion: pointsThisQuestion
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
}

export default Quiz;