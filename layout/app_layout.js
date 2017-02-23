import React from 'react';
import firebase from 'firebase';

import Header from '../components/header';
// import HomePage from '../views/home_page';
// import TopicPage from '../views/topic_page';

class AppLayout extends React.Component {
	constructor() {
		super();
		this.state = {
			userLoggedIn: false,
			user: {}
		}
	}

	// we could potentially add a footer component if we want
	render() {
		return (
			<div className="row">
				<Header isUserLoggedIn={ this.state.userLoggedIn }
								user={ this.state.user }/>
				{ React.cloneElement(this.props.children, {
          	isUserLoggedIn: this.state.userLoggedIn
        	}) }
			</div>
		)
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			console.log('AppLayout: This user just logged/signed in: ', user);
	    if (user) {
	      this.setState({ userLoggedIn: true, user: user });
	    } else {
	      this.setState({ userLoggedIn: false });
	    }
	  });
	}

}			

export default AppLayout;