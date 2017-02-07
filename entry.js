import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

import AppLayout from './layout/app_layout';

import HomePage from './views/home_page';
import TopicPage from './views/topic_page';

require("file?name=[name].[ext]!./index.html");
require("!style-loader!css-loader!sass-loader!./styles.scss");

/*
 * Via the render function in entry.js, we a declaring the route
 * architecture that the app will use in the different views
 */


ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={AppLayout}>
			<IndexRoute component={HomePage}/>
			<Route path="topic" component={TopicPage}/>
		</Route>
	</Router>
), document.getElementById("view-container"));
