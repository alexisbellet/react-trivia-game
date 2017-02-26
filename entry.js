import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

import AppLayout from './layout/app_layout';

import HomePage from './views/home_page';
import TopicPage from './views/topic_page';
import LogInPage from './views/login_page';
import SignUpPage from './views/signup_page';
import PageNotFound from './views/notfound_page';

require("file?name=[name].[ext]!./index.html");
require("./styles.scss");

import firebase from 'firebase'; 
var config = {
  apiKey: "AIzaSyC9FKD53f5xSjZ24gG0urlBVuKZmT3s-U4",
  authDomain: "react-trivia-game.firebaseapp.com",
  databaseURL: "https://react-trivia-game.firebaseio.com",
  storageBucket: "react-trivia-game.appspot.com",
  messagingSenderId: "883565170891"
};
firebase.initializeApp(config);

/*
 * Via the render function in entry.js, we a declaring the route
 * architecture that the app will use in the different views
 */

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={AppLayout}>
			<IndexRoute component={HomePage}/>
			<Route path="topic/:topic" component={TopicPage}/>
			<Route path="sign-up" component={SignUpPage} />
			<Route path="log-in" component={LogInPage} />
			<Route path="*" component={PageNotFound}/>
		</Route>
	</Router>
), document.getElementById("view-container"));
