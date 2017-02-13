import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {
	constructor() {
	    super()
	    this.state = {
	      userName: '',
	      mode: 'login',
	      email: '',
	      password: '',
	      error: null
	    }
	    this.setUser = this.setUser.bind(this);
	}

	render() {
		if (this.state.mode == 'login') {
		  return <div className="splash">
		    { this.state.error && <div>{ this.state.error }</div> }
		    <input type='text'
		           placeholder="Email!"
		           onChange={ (evt) => this.setState({ email: evt.target.value}) }/>
		    <input type='password'
		           placeholder="Password"
		           onChange={ (evt) => this.setState({ password: evt.target.value }) }/>
		    <button onClick={ (evt) => this.login() }>Login</button>

		    <a href='#' onClick={ (evt) => this.setState({ mode: 'signup '})}>Don't have an account? Sign up!</a>
		  </div>
		} else {
	    // return <SignUp onLogin={ this.props.onLogin } />
		}
	}

	login(){
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then(console.log(this.state.email))
		.catch(err => this.setState({ error: err.message }));
		}

		setUser(userName) {
		this.setState({userName: userName});
	}
}


export default Login;