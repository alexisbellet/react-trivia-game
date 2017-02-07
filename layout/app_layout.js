import React from 'react';

import Header from '../components/header';
// import HomePage from '../views/home_page';
// import TopicPage from '../views/topic_page';

class AppLayout extends React.Component {
	constructor() {
		super();
		this.state = {
			quizes: {
				quiz1: {
					name: 'JavaScript Facts and Fun',
					category: 'JavaScript',
					questions: {
						question1: 'Who is the inventor of JSON?',
						answers1: {
							correct: 'Douglas Crockford',
							incorrect: ['Brendan Eich', 'Linus Torvalds', 'Grace Hopper'],
							source1: ''
						},
						question2: 'Which of the following is NOT a JavaScript framework?',
						answers2: {
							correct: 'Elm',
							incorrect: ['Dojo', 'Ractive', 'Marionette'],
							source: ''
						}						
					}
				},
				quiz2: {
					name: 'Popular Algorithms',
					category: 'Computer Science',
					questions: {
						question1: 'Which culture, have we found, was the first to use Algorithms?',
						answers1: {
							correct: 'Babylonians in 1600s BCE',
							incorrect: ['Egyptians in 1300s BCE', 'Sumerians in 3100s BCE ', 'Persians in 800s BCE'],
							source: 'https://medium.com/@_marcos_otero/the-real-10-algorithms-that-dominate-our-world-e95fa9f16c04#.p90x20j1x'					
						}
					}
				}
			},
			user: {
				name: '',
				avatar: ''
			}
		};
	}

	// we could potentially add a footer component if we want
	render() {
		return (
			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<Header />
				{ this.props.children }
			</div>
		)
	}
}

// 				

export default AppLayout;