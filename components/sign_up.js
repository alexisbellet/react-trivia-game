import React from 'react';
import firebase from 'firebase';

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      email: '',
      password: '',
      error: null
    }
  }

  render() {
    return (
      <div className="splash">
          { this.state.error && <div>{ this.state.error }</div> }
          <input type='text'
                 placeholder="Your Name"
                 onChange={ (evt) => this.setState({ userName: evt.target.value }) }/>
          <input type='text'
                 placeholder="Email"
                 onChange={ (evt) => this.setState({ email: evt.target.value }) }/>
          <input type='password'
                 placeholder="Password"
                 onChange={ (evt) => this.setState({ password: evt.target.value }) }/>
    
          <button onClick={ (evt) => this.signup() }>Sign Up</button>
      </div>
    )
  }

  signup() {
    // Sign in with Firebase here...
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => user.updateProfile({
      displayName: this.state.userName
    }))
    .then(user => this.props.onLogin(this.state.userName))
    .catch(err => this.setState({ error: err.message }));
  }
}

export default SignUp;
