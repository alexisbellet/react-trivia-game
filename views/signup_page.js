import React from 'react';
import firebase from 'firebase';
import { Link, browserHistory } from 'react-router';

class SignUpPage extends React.Component {
	constructor() {
		super();
		this.state = {
		  userName: '',
		  email: '',
		  password: '',
		  photoURL: '',
		  avatarList: ['../assets/avatars/noun_709544_cc.svg', 
									 '../assets/avatars/noun_709545_cc.svg', 
									 '../assets/avatars/noun_709549_cc.svg', 
									 '../assets/avatars/noun_709555_cc.svg', 
									 '../assets/avatars/noun_709576_cc.svg', 
									 '../assets/avatars/noun_709580_cc.svg', 
									 '../assets/avatars/noun_734104_cc.svg'],
		  error: null,
		  signupSuccess: false
		};

		this.signup = this.signup.bind(this);
		this.selectAvatar = this.selectAvatar.bind(this);
	}

	render() {
    const { query } = this.props.location;
    const { topic } = query;
    return (
      <div className="sign-up-container splash">
          <h3>Sign up now for Nerdia!</h3>
          <input required
          			 type='text'
                 placeholder="Your Name"
                 onChange={ (evt) => this.setState({ userName: evt.target.value }) }/>
          <input required
          			 type='text'
                 placeholder="Email"
                 onChange={ (evt) => this.setState({ email: evt.target.value }) }/>
          <input required
          			 type='password'
                 placeholder="Password"
                 onChange={ (evt) => this.setState({ password: evt.target.value }) }/>
          <div className="avatar-list">
          	<h4>Pick a Nerdia avatar!</h4>
          	{ this.state.avatarList.map((avatarURL, index) => {
          		// display a list of avatar and whenever one of them is being clicked on
          		// display selected class & update this.state.photoURL
          		return <img className={ this.state.photoURL === avatarURL ? "avatar-img avatar-selected" : "avatar-img" }
          								src={ avatarURL }
          								key={ index } 
          								onClick={ () => this.selectAvatar(avatarURL) }/>
          	}) }
          </div>
    
          <button onClick={ (evt) => this.signup() }>Sign Up</button>
          <Link to={ topic ? "/log-in?topic=" + topic : "/log-in" }>Already have an account? Login!</Link>
          { this.state.error && <div className="error-message">Hey! It looks like: { this.state.error }</div> }
      </div>
    )
  }

  selectAvatar(avatarURL) {
  	this.setState({ photoURL: avatarURL });
  }

  signup() {
  	// make sure user selects avatar photo
  	if (this.state.photoURL.length < 1) {
  		alert("please select an avatar by clicking on an image");
  		return;
  	}

    // Sign in with Firebase here...
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => user.updateProfile({
      displayName: this.state.userName,
      photoURL: this.state.photoURL
    }))
    .catch(err => {
    	this.setState({ error: err.message })
    });
  }

  componentWillReceiveProps(nextProps) {
  	// Once the user has signed in, the page redirects to home or topic page (if exists as query)
    if (nextProps.isUserLoggedIn) {
      if (!this.props.location.query.topic) {
        browserHistory.push('/');
      } else {
        browserHistory.push('/topic/' + (this.props.location.query.topic));
      }
    } 
  }
}

export default SignUpPage; 