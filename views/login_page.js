import React from 'react';
import firebase from 'firebase';
import ReactRedirect from 'react-redirect';
import { Link, browserHistory } from 'react-router';

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
		.then( () => { this.setState({ loggedIn: true }) })
		.catch( err => this.setState({ error: err.message }));
	}
	
	render() {
		// Link to sign-up page keeps topic in the url so 
		// user can be redirected to where he/she wanted to go at first
		return (
			<div className="log-in-container splash">
		    <input type='text'
		           placeholder="Type in your email"
		           onChange={ (evt) => this.setState({ email: evt.target.value}) }/>
		    <input type='password'
		           placeholder="Password"
		           onChange={ (evt) => this.setState({ password: evt.target.value }) }/>
		    <button onClick={ (evt) => this.loginAttempt() }>Login</button>
		    <Link to={ "/sign-up/" + (this.props.params.topic) }>Don't have an account? Sign up!</Link>
		    { this.state.error && <div className="error-message">Hey! It looks like: { this.state.error }</div> }
		  </div>
		)
	}

	componentWillReceiveProps(nextProps) {
		// if doesnt exist, push just to slash
		if (nextProps.isUserLoggedIn) {
			if (!this.props.params.topic) {
				browserHistory.push('/');
			} else {
				browserHistory.push('/topic' + (this.props.params.topic));
			}
		} 
	}
}

export default LogInPage;