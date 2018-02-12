var _throttle = require('lodash/throttle');

var React = require('react');
var TimerMixin = require('react-timer-mixin');

var Keyboard = require('./threex.keyboardstate.js');

/* Prevent backspace from navigating back in browser, or Ctrl-T/Ctrl-S in Firefox.
 * Note: this breaks inputs. See
 * http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
 */
document.addEventListener('keydown', function(e) {
  e = e || event;
  var keyCode = e.which || e.keyCode || 0;

  // Check for backspace, space, and arrow keys
  if ([8, 32, 37, 38, 39, 40].indexOf(keyCode) >= 0) {
    e.preventDefault();
  } else if (e.ctrlKey && (keyCode === 84 || keyCode === 85)) {
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
    return Keyboard.pressed(key);
  },
};

module.exports = KeyboardMixin;
