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
		return (
			<div className="headerContainer">
			  	<header>
			  		<Link to={'/'} >
				  		<div className="logo" >
				  			<img src="" alt="Nerdia Logo"/>
					  		<h1>Nerdia Tech Trivia</h1>
				  		</div>
			  		</Link>
			  		
			  		<img className="avatar" src={this.props.user.photoURL} alt="User Avatar" onClick={() => this.toggleUserDetails() }/>
			  	</header>
			  	{this.state.showResults && <UserDetails avatar={ this.props.user.photoURL } />}
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