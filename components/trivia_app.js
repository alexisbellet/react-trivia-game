import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';


class TriviaApp extends React.Component {
	constructor() {
		super();

		this.state = {
			games : {
				name: '',
				category: '',
				questions: {}
			}
		}
	}

	render() {

		return (
			<div>
			  	<Header />
			  	<main>
			  		<div className="poster">
			  			<h2 className="poster--title">Welcome to Nerdia Tech Trivia</h2>
			  		</div>
			  		<div className="trivia">
			  			<div className="trivia--game  trivia--game01"></div>
			  			<div className="trivia--game  trivia--game02"></div>
			  			<div className="trivia--game  trivia--game03"></div>
			  			<div className="trivia--game  trivia--game04"></div>
			  			<div className="trivia--game  trivia--game05"></div>
			  			<div className="trivia--game  trivia--game06"></div>
			  			<div className="trivia--game  trivia--game07"></div>
			  			<div className="trivia--game  trivia--game08"></div>
			  			<div className="trivia--game  trivia--game09"></div>
			  			<div className="trivia--game  trivia--game10"></div>
			  			<div className="trivia--game  trivia--game11"></div>
			  			<div className="trivia--game  trivia--game12"></div>
			  			<div className="trivia--game  trivia--game13"></div>
			  		</div>

			  		
			  	</main>


			</div>

		)
	}
}

export default TriviaApp;