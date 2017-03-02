import React from 'react';
import UserDetails from './user_details';
import { Link } from 'react-router';

class Header extends React.Component {
	constructor(){
		super();
		this.state = {
			showResults: false
		}
	}
	
	render() {
		const { isUserLoggedIn, user } = this.props;
		const { displayName } = user;
		return (
			<div className="headerContainer">
			  	<header>
			  		<Link to={'/'} >
				  		<div className="logo" >
					  		<h1>Nerdia Tech Trivia</h1>
				  		</div>
			  		</Link>
			  		
			  		{ // if user is loggedIn display avatar, if not, display signup & login buttons
			  			isUserLoggedIn ? 
			  			(<div className="header-avatar-container" onClick={() => this.toggleUserDetails() }>
			  				<img className="avatar" src={ user.photoURL } alt="User Avatar"/>
			  				<span>Hi { displayName }!</span>
			  			</div> ) :
			  			(<div className="header-link-container">
			  				<Link to="/sign-up" className="btn">Sign up</Link> 
			  				<Link to="/log-in" className="btn">Log in</Link> 
			  			</div>)
			  		}

			  	</header>
			  	{this.state.showResults && <UserDetails avatar={ user.photoURL } closeDetails={ () => this.toggleUserDetails() }/>}
			</div>
		)
	}

	toggleUserDetails(){
		const newState = !this.state.showResults;
		this.setState({
			showResults: newState
		})
	}
}

export default Header;