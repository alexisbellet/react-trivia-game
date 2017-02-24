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
    console.log("decrement", this.props.remainingTime);
    if (this.props.remainingTime >= 0){
      let result = this.props.remainingTime - 1;
      this.props.updateTimer(result);
    }
  }
  componentDidMount() {
    this.interval = setInterval(this.decrementTimer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="react-count-down">
        <p type="text" className="countdownNum">{this.props.remainingTime}</p>
      </div>
    )
  }
}
