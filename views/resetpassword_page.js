import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';

class ResetPasswordPage extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			emailSent: false,
			error: ''
		};
		this.resetPassword = this.resetPassword.bind(this);
	}

	render() {
		const { query } = this.props.location;
		const { topic } = query;

		if (this.state.emailSent == false) {
			return (
				<div className="reset-passwrod-container">
					{ this.state.error && <div className="error-message">Hey! It looks like: { this.state.error }</div> }
					<input type='text'
					       placeholder="Type in the email you've used to create your account..."
					       onChange={ (evt) => this.setState({ email: evt.target.value}) }/>
					<button onClick={ (evt) => this.resetPassword() }>Reset password!</button>
				</div>
			)
		} else {
			return (
				<div className="reset-passwrod-container">
					<p>A password reset email was sent to { this.state.email }, now wait for the email & head back to the <Link to={ topic ? "/log-in?topic=" + topic : "/log-in" }>login page</Link></p>
				</div>
			)
		}
	}

	resetPassword() {
		let emailToReset = this.state.email;

		firebase.auth().sendPasswordResetEmail(emailToReset)
		.then(() => this.setState({ emailSent: true, error: '' }))
		.catch((err) => this.setState({ error: err.message }));
	}

}

export default ResetPasswordPage;