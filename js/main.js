var React = require('react');
var ReactDOM = require('react-dom');

var Audio = require('./Audio.js');
var Game = require('./Game.react.js');
var Loading = require('./Loading.react.js');

// Render loading screen
ReactDOM.render(
  <Loading />,
  document.getElementById('loading-text')
);

// Render game DOM on load
var renderGameDOM = ReactDOM.render.bind(this,
  <Game />,
  document.getElementById('content')
);

// Load sounds, play BGM
Audio.loadAllSounds(() => {
  Audio.playBGM();
  renderGameDOM();
}, () => {
  console.error('failed to load sounds!');
});
