var React = require('react');
var KeyboardMixin = require('./KeyboardMixin.react.js');

var CapsLock = React.createClass({
  mixins: [KeyboardMixin],

  getInitialState: function() {
    return {
      on: false,
      needsVerify: true,
    };
  },

  componentDidMount: function() {
    // verify caps-lock every second
    this.setTimeout(this.setState.bind(this, {needsVerify: true}), 1000);
  },

  // onKeyPress: function(e) {
  //   if (!this.state.needsVerify) {
  //     return;
  //   }

  //   var shiftKey = this.isKeyPressed('shift');
  //   var keyCode = e.which || e.keyCode || 0;
  //   var key = String.fromCharCode(keyCode);
  //   if (/[a-z0-9]/.test(key)) {
  //     this.setState({on: shiftKey, needsVerify: false});
  //   } else if (/[A-Z]/.test(key)) {
  //     this.setState({on: !shiftKey, needsVerify: false});
  //   }
  // },

  onKeyDown: function(e) {
    this.setState({on: this.isKeyPressed('Shift') || this.isKeyPressed('CapsLock'), needsVerify: true});
  },

  onKeyUp: function(e) {
    this.setState({on: this.isKeyPressed('Shift') || this.isKeyPressed('CapsLock'), needsVerify: true});
  },

  render: function() {
    if (!this.state.on) {
      return null;
    }

    return (
      <div className="padTop capslock alert alert-danger">
        <b><span className="glyphicon glyphicon-alert" /> UPPERCASE</b>
      </div>
    );
  },
});

module.exports = CapsLock;
