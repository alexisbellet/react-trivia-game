import React from 'react';
import SearchForm from './search_form';
import UserDetails from './user_details';

class Header extends React.Component {
	constructor(){
		super();
		// this.toggleUserDetails = this.toggleUserDetails.bind(this);

		this.state = {
			showResults: false
		}
	}
	
	render() {
		return (
			<div className="headerContainer">
			  	<header>
			  		<div className="logo">
			  			<img src="" alt="Nerdia Logo"/>
				  		<h1>Nerdia Tech Trivia</h1>
			  		</div>
			  		<SearchForm />
			  		<img className="avatar" src="../assets/min-code-on-screen.jpg" alt="User Avatar" onClick={() => this.toggleUserDetails() }/>
			  	</header>
			  	<UserDetails />
			</div>
		)

	}

	toggleUserDetails(){
		const newState != this.state.showResults;
		console.log(this.state.showResults);
		this.setState({
			showResults: newState
		})
	}
}

export default Header;