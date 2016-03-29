var $ = require('jquery');
var React = require('react');

var Game = require('./Game.react.js');

React.render(
  <Game />,
  document.getElementById('content')
);

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
