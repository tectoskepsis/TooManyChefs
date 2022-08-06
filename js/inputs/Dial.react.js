var React = require('react');
var _repeat = require('lodash/repeat');

var Audio = require('../Audio.js');
var KeyboardMixin = require('../KeyboardMixin.react.js');

var Dial = React.createClass({
  holdInterval: 75,
  mixins: [KeyboardMixin],

  propTypes: {
    children: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.element,
              ]),
    startValue: React.PropTypes.number,
    maxValue: React.PropTypes.number,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      startValue: 0,
      maxValue: 50,
    };
  },

  getInitialState: function() {
    return {
      value: this.props.startValue,
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onProgress(this.state.value);
    }
  },

  checkHeldKey: function() {
    if (this.isKeyPressed('left') && this.state.value > 0) {
      Audio.playRandomClick();
      this.setState({value: this.state.value - 1});
    } else if (this.isKeyPressed('right') && this.state.value < this.props.maxValue) {
      Audio.playRandomClick();
      this.setState({value: this.state.value + 1});
    }
  },

  render: function() {
    return (
      <code>
        {_repeat('\xa0', this.state.value) /* non-breakable space */}
        <span className="input">{this.props.children}</span>
      </code>
    );
  },
});

module.exports = Dial;
