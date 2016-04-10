var _ = require('lodash');

// THREEx.KeyboardState.js keep the current state of the keyboard.
// It is possible to query it at any time. No need of an event.
// This is particularly convenient in loop driven case, like in
// 3D demos or games.
//
// # Usage
//
// **Step 1**: Create the object
//
// ```var keyboard  = new THREEx.KeyboardState();```
//
// **Step 2**: Query the keyboard state
//
// This will return true if shift and A are pressed, false otherwise
//
// ```keyboard.pressed("shift+A")```
//
// **Step 3**: Stop listening to the keyboard
//
// ```keyboard.destroy()```
//
// NOTE: this library may be nice as standalone. independent from three.js
// - rename it keyboardForGame
//
// # Code
//

/** @namespace */
var THREEx = THREEx || {};

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
 *  96-105 |  ??????  | '0'-'9' (numpad)
 *         |  65-90   | 'A'-'Z'
 *  65-90  |  97-122  | 'a'-'z'
 */

/**
 * - NOTE: it would be quite easy to push event-driven too
 *   - microevent.js for events handling
 *   - in this._onkeyChange, generate a string from the DOM event
 *   - use this as event name
*/
THREEx.KeyboardState = function(domElement) {
  this.domElement = domElement || document;
  // to store the current state
  this.keyCodes = {};
  this.modifiers = {};

  // create callback to bind/unbind keyboard events
  this._onKeyDown = this._onKeyChange.bind(this);
  this._onKeyUp = this._onKeyChange.bind(this);

  // bind keyEvents
  this.domElement.addEventListener("keydown", this._onKeyDown, false);
  this.domElement.addEventListener("keyup", this._onKeyUp, false);

  // create callback to bind/unbind window blur event
  this._onBlur = () => {
    _.forEach(this.keyCodes, (val, key) => this.keyCodes[key] = false);
    _.forEach(this.modifiers, (val, key) => this.modifiers[key] = false);
  }

  // bind window blur
  window.addEventListener("blur", this._onBlur, false);
}

/**
 * To stop listening of the keyboard events
*/
THREEx.KeyboardState.prototype.destroy = function() {
  // unbind keyEvents
  this.domElement.removeEventListener("keydown", this._onKeyDown, false);
  this.domElement.removeEventListener("keyup", this._onKeyUp, false);

  // unbind window blur event
  window.removeEventListener("blur", this._onBlur, false);
}

THREEx.KeyboardState.MODIFIERS = ['shift', 'ctrl', 'alt', 'meta'];
THREEx.KeyboardState.ALIAS = {
  'left'     : 37,
  'up'       : 38,
  'right'    : 39,
  'down'     : 40,
  'space'    : 32,
  'pageup'   : 33,
  'pagedown' : 34,
  'tab'      : 9,
  'escape'   : 27,
  'capslock' : 20,
  ';'        : 186,
  '='        : 187,
  ','        : 188,
  '-'        : 189,
  '.'        : 190,
  '/'        : 191,
  '['        : 219,
  '\\'       : 220,
  ']'        : 221,
  '\''       : 222,
};
THREEx.KeyboardState.NUMPAD = {
  '0' : 96,
  '1' : 97,
  '2' : 98,
  '3' : 99,
  '4' : 100,
  '5' : 101,
  '6' : 102,
  '7' : 103,
  '8' : 104,
  '9' : 105,
};
THREEx.KeyboardState.KEYMAP = {
  ':' : 'shift+;',
  '"' : 'shift+\'',
  '!' : 'shift+1',
  '@' : 'shift+2',
  '#' : 'shift+3',
  '$' : 'shift+4',
  '%' : 'shift+5',
  '^' : 'shift+6',
  '&' : 'shift+7',
  '*' : 'shift+8',
  '(' : 'shift+9',
  ')' : 'shift+0',
  '<' : 'shift+,',
  '>' : 'shift+.',
  '?' : 'shift+/',
  '{' : 'shift+[',
  '}' : 'shift+]',
  '|' : 'shift+\\',
};

/**
 * to process the keyboard dom event
*/
THREEx.KeyboardState.prototype._onKeyChange = function(e) {
  // update keyCodes
  var keyCode = e.keyCode || e.which || 0;
  var pressed = e.type === 'keydown';
  this.keyCodes[keyCode] = pressed;
  // update modifiers
  this.modifiers['shift'] = e.shiftKey;
  this.modifiers['ctrl']  = e.ctrlKey;
  this.modifiers['alt'] = e.altKey;
  this.modifiers['meta']  = e.metaKey;
}

/**
 * query keyboard state to know if a key is pressed of not
 *
 * @param {String} keyDesc the description of the key. format : modifiers+key e.g shift+A
 * @returns {Boolean} true if the key is pressed, false otherwise
*/
THREEx.KeyboardState.prototype.pressed = function(keyDesc) {
  keyDesc = _.get(THREEx.KeyboardState.KEYMAP, keyDesc, keyDesc);

  var keys = keyDesc.split('+');
  return _.every(keys, (key, i) => {
    if (_.includes(THREEx.KeyboardState.MODIFIERS, key)) {
      return this.modifiers[key];
    }
    if (_.has(THREEx.KeyboardState.ALIAS, key)) {
      return this.keyCodes[THREEx.KeyboardState.ALIAS[key]];
    }

    return this.keyCodes[key.toUpperCase().charCodeAt()] ||
           (_.has(THREEx.KeyboardState.NUMPAD, key) &&
            this.keyCodes[THREEx.KeyboardState.NUMPAD[key]]);
  });
};

/**
 * return true if an event match a keyDesc
 * @param  {KeyboardEvent} event   keyboard event
 * @param  {String} keyDesc   description of the key
 * @return {Boolean} true if the event match keyDesc, false otherwise
 */
THREEx.KeyboardState.prototype.eventMatches = function(e, keyDesc) {
  var keyCode = e.keyCode || e.which || 0;
  const aliases = THREEx.KeyboardState.ALIAS;
  var keys = keyDesc.split('+');

  return _.every(keys, (key) => {
    var pressed = false;
    switch (key) {
      case 'shift':
        return e.shiftKey;
      case 'ctrl':
        return e.ctrlKey;
      case 'alt':
        return e.altKey;
      case 'meta':
        return e.metaKey;

      default:
        if (_.has(aliases, key)) {
          return keyCode === aliases[key];
        }
        return keyCode === key.toUpperCase().charCodeAt(0);
    }
  });
};

module.exports = new THREEx.KeyboardState();
