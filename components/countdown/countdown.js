import React from 'react'
/**
 * Count down module
 * A simple count down component.
**/
export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.decrementTimer = this.decrementTimer.bind(this);
  }
  decrementTimer() {
    if (this.props.remainingTime > 0) {
      let result = this.props.remainingTime - 1;
      this.props.updateTimer(result);
    } else if (this.props.remainingTime === 0) {
      let result = this.props.remainingTime - 1;
      this.props.updateTimer(result);
      // when time is out, countdown calls checkCorrectness with 
      // an empty string and currentQuestion as an index
      this.props.checkCorrectness('', this.props.currentQuestion);
    } else {
      return;
    }
  }
  componentDidMount() {
    this.interval = setInterval(this.decrementTimer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { remainingTime, currentQuestion, amountOfQuestions } = this.props;

    // when currentQuestion is higher than the amountOfQuestions 
    // (i.e. when the quiz is over), countdown hides
    return (
      <div className={currentQuestion >= amountOfQuestions ? "hide" : "react-count-down"}>
        <p type="text" className="countdownNum">
          {
            remainingTime > 1 ? 
            "Time left to answer: " + remainingTime + " seconds" : 
            remainingTime === 1 ? 
              "Time left to answer: " + remainingTime + " second" : 
              "Time is out!"
          }
        </p>
      </div>
    )
  }
}

