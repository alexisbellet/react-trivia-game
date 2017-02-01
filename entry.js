import React from 'react';
import ReactDOM from 'react-dom';
import TriviaApp from './components/trivia_app';

require("file?name=[name].[ext]!./index.html");
require("!style-loader!css-loader!sass-loader!./styles.scss");



ReactDOM.render(<TriviaApp />, document.getElementById("view-container"));
