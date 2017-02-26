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
		const { query } = this.props.location;
		const { topic } = query;
		// Link to sign-up page and keep on passing topic if it was passed as query
		return (
			<div className="log-in-container splash">
		    <input type='text'
		           placeholder="Type in your email"
		           onChange={ (evt) => this.setState({ email: evt.target.value}) }/>
		    <input type='password'
		           placeholder="Password"
		           onChange={ (evt) => this.setState({ password: evt.target.value }) }/>
		    <button onClick={ (evt) => this.loginAttempt() }>Login</button>
		    <Link to={ topic ? "/reset-password?topic=" + topic : "/reset-password" }>Forgot your password?</Link>
		    <Link to={ topic ? "/sign-up?topic=" + topic : "/sign-up" }>Don't have an account? Sign up!</Link>
		    { this.state.error && <div className="error-message">Hey! It looks like: { this.state.error }</div> }
		  </div>
		)
	}

	componentWillReceiveProps(nextProps) {
		// Once the user is logged in, the login page redirects to home or topic page (if exists as query)
		if (nextProps.isUserLoggedIn) {
			if (!this.props.location.query.topic) {
				browserHistory.push('/');
			} else {
				browserHistory.push('/topic/' + (this.props.location.query.topic));
			}
		} 
	}
}

export default LogInPage;