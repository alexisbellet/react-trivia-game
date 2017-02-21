import React from 'react';
import firebase from 'firebase';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      password: '',
      photoURL: '',
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
    const photos = ['../assets/avatars/noun_709544_cc.svg', '../assets/avatars/noun_709545_cc.svg', '../assets/avatars/noun_709549_cc.svg', '../assets/avatars/noun_709555_cc.svg', '../assets/avatars/noun_709576_cc.svg', '../assets/avatars/noun_709580_cc.svg', '../assets/avatars/noun_734104_cc.svg', '../assets/avatars/noun_709545_cc.svg'];

    // Sign in with Firebase here...
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => user.updateProfile({
      displayName: this.state.userName
    }))
    .then(user => user.updateProfile({
      photoURL: '../assets/avatars/noun_709544_cc.svg'
    }))
    .then(user => this.props.onLogin(this.state.userName))
    .catch(err => this.setState({ error: err.message }));
  }
}

export default SignUp;
