import React from 'react';

import TopicBlock from '../components/topic_block';

class HomePage extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
		  	<main>
					<div className="poster">
						<h2 className="poster--title">Welcome to Nerdia Tech Trivia</h2>
					</div>

					<div className="trivia">
						<TopicBlock className="trivia--game	trivia--game01" />
						<TopicBlock className="trivia--game  trivia--game02" />
						<TopicBlock className="trivia--game  trivia--game03" />
						<TopicBlock className="trivia--game  trivia--game04" />
						<TopicBlock className="trivia--game  trivia--game05" />
						<TopicBlock className="trivia--game  trivia--game06" />
						<TopicBlock className="trivia--game  trivia--game07" />
						<TopicBlock className="trivia--game  trivia--game08" />
						<TopicBlock className="trivia--game  trivia--game09" />
						<TopicBlock className="trivia--game  trivia--game10" />
						<TopicBlock className="trivia--game  trivia--game11" />
						<TopicBlock className="trivia--game  trivia--game12" />
						<TopicBlock className="trivia--game  trivia--game13" />
					</div>
					
				</main>


			</div>
		)
	}
}

export default HomePage;


