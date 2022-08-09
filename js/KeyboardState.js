KeyboardState = function() {
    // to store the current state
    this.activeKeys = {};
  
    // create callback to bind/unbind keyboard events
    this._onKeyDown = this._onKeyChange.bind(this);
    this._onKeyUp = this._onKeyChange.bind(this);
  
    // bind keyEvents
    document.addEventListener('keydown', this._onKeyDown, false);
    document.addEventListener('keyup', this._onKeyUp, false);
  
    // create callback to bind/unbind window blur event
    this._onBlur = () => {
        this.activeKeys = {};
    }
  
    // bind window blur
    window.addEventListener('blur', this._onBlur, false);
}

KeyboardState.prototype.destroy = function() {
    // unbind keyEvents
    document.removeEventListener('keydown', this._onKeyDown, false);
    document.removeEventListener('keyup', this._onKeyUp, false);
  
    // unbind window blur event
    window.removeEventListener('blur', this._onBlur, false);
}

// DOES NOT WORK WHEN THERE ARE MULTIPLE KEYBOARDS
KeyboardState.prototype._onKeyChange = function(e) {
    // update activeKeys
    this.activeKeys[e.key] = e.type === 'keydown';
    // capslock only gives a keyDown event
    this.activeKeys['CapsLock'] = e.getModifierState && e.getModifierState('CapsLock');
}

/**
 * query keyboard state to know if a character is pressed or not
 *
 * @param {String} key  the character
 * @returns {Boolean}       true if the key is pressed, false otherwise
*/
KeyboardState.prototype.isPressed = function(key) {
    return !!this.activeKeys[key];
};

/**
 * return true if an event matches a character typed
 * @param  {KeyboardEvent} e    keyboard event
 * @param  {String} key         the character
 * @return {Boolean}            true if the event match key, false otherwise
 */
KeyboardState.prototype.eventMatches = function(e, key) {
    return e.key === key;
};

module.exports = new KeyboardState();