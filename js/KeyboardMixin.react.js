var $ = require('jquery');
var _ = require('lodash');

var React = require('react');
var TimerMixin = require('react-timer-mixin');

var Keyboard = require('./threex.keyboardstate.js');

/**
 * Table of codes because javascript is trash
 * keyCode | charCode | character
 * ------------------------------
 *  20     |  N/A     |  caps-lock
 *  37     |  N/A     |  left
 *  38     |  N/A     |  up
 *  39     |  N/A     |  right
 *  40     |  N/A     |  down
 *  48-57  |  ??????  | '0'-'9'
 *         |  65-90   | 'A'-'Z'
 *  65-90  |  97-122  | 'a'-'z'
 */

/* Prevent backspace from navigating back in browser, or Ctrl-T/Ctrl-S in Firefox.
 * Note: this breaks inputs. See
 * http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
 */
$(document).unbind('keydown').on('keydown', function(e) {
  e = e || event;
  var keyCode = e.which || e.keyCode || 0;

  if (keyCode === 8) {
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
    var $doc = $(document);

    if (this.onKeyDown) {
      $doc.on('keydown', this.onKeyDown);
    }
    if (this.onKeyPress) {
      $doc.on('keypress', this.onKeyPress);
    }
    if (this.onKeyUp) {
      $doc.on('keyup', this.onKeyUp);
    }

    if (this.checkHeldKey) {
      var holdInterval = this.holdInterval || 50;
      this.checkHeldKey = _.throttle(this.checkHeldKey, holdInterval);
      this.timerInterval = this.setInterval(this.checkHeldKey, holdInterval);
      $doc.on('keydown', this.checkHeldKey);
    }
  },

  componentWillUnmount: function() {
    var $doc = $(document);

    if (this.onKeyDown) {
      $doc.off('keydown', this.onKeyDown);
    }
    if (this.onKeyPress) {
      $doc.off('keypress', this.onKeyPress);
    }
    if (this.onKeyUp) {
      $doc.off('keyup', this.onKeyUp);
    }

    if (this.checkHeldKey) {
      this.clearInterval(this.timerInterval);
      $doc.off('keydown', this.checkHeldKey);
    }
  },

  isKeyPressed: function(key) {
    return Keyboard.pressed(key);
  },
};

module.exports = KeyboardMixin;
