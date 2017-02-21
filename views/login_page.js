import React from 'react';
import firebase from 'firebase';
import ReactRedirect from 'react-redirect';
import { Link } from 'react-router';

class LogInPage extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			error: null,
			loggedIn: false
		};
		this.loginAttempt = this.loginAttempt.bind(this);
	}

	loginAttempt() {
		// if login successful, set loggedIn state to true, which triggers redirect
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then( () => this.setState({ loggedIn: true }))
		.catch( err => this.setState({ error: err.message }));
	}
	
	render() {
		if (!this.state.loggedIn) {
			// Link to sign-up page keeps topic in the url so 
			// user can be redirected to where he/she wanted to go at first
			return (
				<div className="splash">
			    { this.state.error && <div>{ this.state.error }</div> }
			    <input type='text'
			           placeholder="Type in your email"
			           onChange={ (evt) => this.setState({ email: evt.target.value}) }/>
			    <input type='password'
			           placeholder="Password"
			           onChange={ (evt) => this.setState({ password: evt.target.value }) }/>
			    <button onClick={ (evt) => this.loginAttempt() }>Login</button>

			    <Link to={ "/sign-up/" + (this.props.params.topic) }>Don't have an account? Sign up!</Link>
			  </div>
			)
		} else {
			// if login succeeds, send the user to the appropriate topic page
			return <ReactRedirect location={"/topic/" + (this.props.params.topic) }></ReactRedirect> 
		}
	}
}

export default LogInPage;