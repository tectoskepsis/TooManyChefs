var React = require('react');
var ReactDOM = require('react-dom');

var Game = require('./Game.react.js');
var Audio = require('./Audio.js');

// Render game DOM
var renderGameDOM = ReactDOM.render.bind(this,
  <Game />,
  document.getElementById('content')
);

// Load sounds, play BGM
Audio.loadAllSounds(() => {
  Audio.playBGM();
  renderGameDOM();
}, () => {
  // failed to load sounds
  console.error('failed to load sounds!');
  renderGameDOM();
});
