var $ = require('jquery');
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
var audio = AudioPlayer('./audio/Fortaleza.mp3', {loop: true});
audio.on('load', () => {
  audio.play();
  audio.node.connect(audio.context.destination);
});


/* Prevent backspace from navigating back in browser, or Ctrl-T/Ctrl-S in Firefox.
 * Note: this breaks inputs. See
 * http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
 */
$(document).unbind('keydown').bind('keydown', function(e) {
  if (e.keyCode === 8) {
    event.preventDefault();
  } else if (e.ctrlKey && (e.keyCode === 84 || e.keyCode === 85)) {
    event.preventDefault();
  }
});
