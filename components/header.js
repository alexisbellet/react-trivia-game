import React from 'react';
import SearchForm from './search_form';
import UserDetails from './user_details';

class Header extends React.Component {
	render() {
		return (
			<div className="headerContainer">
			  	<header>
			  		<div className="logo">
			  			<img src="" alt="Nerdia Logo"/>
				  		<h1>Nerdia Tech Trivia</h1>
			  		</div>
			  		<SearchForm />
			  		<img className="avatar" src="../assets/min-code-on-screen.jpg" alt="User Avatar" />
			  	</header>
			  	<div className="userDetails"></div>
			</div>
		)

	}
}

export default Header;