import React from 'react';

class SearchForm extends React.Component {
	render() {
		return (
			<div>
		  		<form>
		  			<input type="search"/>
		  			<input type="submit" value="Submit"/>
		  		</form>
	  		</div>
		)
	}
}

export default SearchForm;