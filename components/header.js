import React from 'react';
import SearchForm from './search_form';

class Header extends React.Component {
	render() {
		return (
		  	<header>
		  		<div className="logo">
		  			<img src="" alt="Nerdia Logo"/>
			  		<h1>Nerdia Tech Trivia</h1>
		  		</div>
		  		<SearchForm />
		  		<img src="" alt="User Avatar"/>
		  	</header>
		)
	}
}

export default Header;