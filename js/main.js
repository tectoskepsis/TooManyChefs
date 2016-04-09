var React = require('react');
var ReactDOM = require('react-dom');
var AudioPlayer = require('web-audio-player');

var Game = require('./Game.react.js');

// Render game DOM
ReactDOM.render(
  <Game />,
  document.getElementById('content')
);

// Play music
var audio = AudioPlayer('./audio/Fortaleza.mp3', {loop: true, volume: 0.8});
audio.on('load', () => {
  audio.play();
  audio.node.connect(audio.context.destination);
});
