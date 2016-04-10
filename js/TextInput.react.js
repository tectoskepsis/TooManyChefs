var React = require('react');

var KeyboardMixin = require('./KeyboardMixin.react.js');
var Audio = require('./Audio.js');

var TextInput = React.createClass({
  mixins: [KeyboardMixin],

  propTypes: {
    children: React.PropTypes.string,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      value: '',
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onProgress(this.state.value);
    }
  },

  onKeyPress: function(e) {
    var keyCode = e.which || e.keyCode || 0;

    // normal key (only accept alphanumeric values)
    var key = String.fromCharCode(keyCode);
    if (/[a-zA-Z0-9-_ ]/.test(key)) {
      Audio.playRandomClick();
      var newValue = this.state.value.concat(key);
      this.setState({value: newValue});
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
