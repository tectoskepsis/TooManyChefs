var React = require('react');
var _trim = require('lodash/trim');
var _every = require('lodash/every');

var KeyboardMixin = require('../KeyboardMixin.react.js');
var Audio = require('../Audio.js');

var TextInput = React.createClass({
  mixins: [KeyboardMixin],

  propTypes: {
    children: React.PropTypes.string,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func,
    allowEnter: React.PropTypes.bool,
    allowBackspace: React.PropTypes.bool,
    maxLength: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      maxLength: 100,
    };
  },

  getInitialState: function() {
    return {
      value: '',
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value && this.props.onProgress) {
      this.props.onProgress(_trim(this.state.value));
    }
  },

  onKeyPress: function(e) {
    var key = e.key;

    if (this.state.value.length < this.props.maxLength) {
      Audio.playRandomClick();
      this.setState({value: this.state.value.concat(key)});
    }
  },

  onKeyDown: function(e) {
    var key = e.key;
    if (this.props.allowEnter && key === 'Enter') {
      var val = _trim(this.state.value);
      if (val) {
        this.props.onComplete(val);
      }
    } else if (this.props.allowBackspace && key === 'Backspace') { // backspace
      Audio.playRandomClick();
      this.setState({value: this.state.value.slice(0, -1)});
    } else if (key === ' ' && this.state.value.length < this.props.maxLength) { // space
      Audio.playRandomClick();
      this.setState({value: this.state.value.concat(' ')});
    }
  },

  render: function() {
    return (
      <span className="padTop">
        {this.props.children}
        <code>
          <span className="input">
            {this.state.value}
            <u>&nbsp;</u>
          </span>
        </code>
      </span>
    );
  },
});

module.exports = TextInput;
