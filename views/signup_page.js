import React from 'react';
import firebase from 'firebase';
import ReactRedirect from 'react-redirect';

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
									 '../assets/avatars/noun_734104_cc.svg', 
									 '../assets/avatars/noun_709545_cc.svg'],
		  error: null,
		  signupSuccess: false
		};

		this.signup = this.signup.bind(this);
		this.selectAvatar = this.selectAvatar.bind(this);
	}

	render() {
		if (!this.state.signupSuccess) {
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
	          <div className="avatar-list">
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
	      </div>
	    )
	  } else {
	  	<ReactRedirect location={"/topic/" + (this.props.params.topic) }></ReactRedirect>
	  }
  }

  selectAvatar(avatarURL) {
  	this.setState({ photoURL: avatarURL });
  }

  signup() {
  	// make sure user selects avatar photo
  	if (this.state.photoURL.length < 1) {
  		alert("please select an avatar by clicking on an image");
  	}

    // Sign in with Firebase here...
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => user.updateProfile({
      displayName: this.state.userName,
      photoURL: this.state.photoURL
    }))
    .then(user => this.setState({ signupSuccess: true }))
    .catch(err => this.setState({ error: err.message }));
  }
}

export default SignUpPage; 