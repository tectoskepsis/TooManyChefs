var React = require('react');
var ReactDOM = require('react-dom');

var Game = require('./Game.react.js');
var Audio = require('./Audio.js');

// Render game DOM
ReactDOM.render(
  <Game />,
  document.getElementById('content')
);

// Play music
Audio.playBGM();
