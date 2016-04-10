var React = require('react');
var ReactDOM = require('react-dom');

var Game = require('./Game.react.js');
var Audio = require('./Audio.js');

// Play music
Audio.playBGM(() => {
  // Render game DOM on music loaded
  ReactDOM.render(
    <Game />,
    document.getElementById('content')
  );
});
