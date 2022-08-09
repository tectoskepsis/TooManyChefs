var _throttle = require('lodash/throttle');

var React = require('react');
var TimerMixin = require('react-timer-mixin');

var Keyboard = require('./KeyboardState.js');

/* Prevent backspace from navigating back in browser, or Ctrl-T/Ctrl-S in Firefox.
 * Note: this breaks inputs. See
 * http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
 */
document.addEventListener('keydown', function(e) {
  // Check for backspace, space, and arrow keys
  const prevent = ['Backspace', ' ', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
  var key = e.key;

  if (prevent.includes(key)) {
    e.preventDefault();
  } else if (e.ctrlKey && (key === 's' || key === 't')) {
    e.preventDefault();
  }
});

/**
 * Keyboard mixin with support for multiple keys held
 * To use, simply implement onKey[Press| Down | Up], checkHeldKey
 */
var KeyboardMixin = {
  mixins: [TimerMixin],

  componentDidMount: function() {
    if (this.onKeyDown) {
      document.addEventListener('keydown', this.onKeyDown, false);
    }
    if (this.onKeyPress) {
      document.addEventListener('keypress', this.onKeyPress, false);
    }
    if (this.onKeyUp) {
      document.addEventListener('keyup', this.onKeyUp, false);
    }

    if (this.checkHeldKey) {
      var holdInterval = this.holdInterval || 50;
      this.checkHeldKey = _throttle(this.checkHeldKey, holdInterval);
      this.timerInterval = this.setInterval(this.checkHeldKey, holdInterval);
      document.addEventListener('keydown', this.checkHeldKey, false);
    }
  },

  componentWillUnmount: function() {
    if (this.onKeyDown) {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
    if (this.onKeyPress) {
      document.removeEventListener('keypress', this.onKeyPress, false);
    }
    if (this.onKeyUp) {
      document.removeEventListener('keyup', this.onKeyUp, false);
    }

    if (this.checkHeldKey) {
      this.clearInterval(this.timerInterval);
      document.removeEventListener('keydown', this.checkHeldKey, false);
    }
  },

  isKeyPressed: function(key) {
    return Keyboard.isPressed(key);
  },
};

module.exports = KeyboardMixin;
