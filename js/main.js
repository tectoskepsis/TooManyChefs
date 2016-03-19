var $ = require('jquery');
var React = require('react');

var Game = require('./Game.react.js');

React.render(
  <Game />,
  document.getElementById('content')
);

/* Prevent backspace from navigating back in browser.
 * Note: this breaks inputs. See
 * http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
 */
$(document).unbind('keydown').bind('keydown', function(e) {
  if (e.keyCode === 8) {
    event.preventDefault();
  }
});
