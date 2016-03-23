var React = require('react');

require('./helper.js');

var Dial = React.createClass({
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

  componentDidMount: function() {
    window.addEventListener('keydown', this.onKeyDown);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.onKeyDown);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onProgress(this.state.value);
    }
  },

  onKeyDown: function(e) {
    var keyCode = e.which || e.keyCode || 0;
    if (keyCode === 37 && this.state.value > 0) {
      // left arrow pressed
      this.setState({value: this.state.value - 1});
    } else if (keyCode === 39 && this.state.value < this.props.maxValue) {
      // right arrow pressed
      this.setState({value: this.state.value + 1});
    }
  },

  render: function() {
    return (
      <code>
        {'\xa0'.repeat(this.state.value) /* non-breakable space */}
        <span className="input">{this.props.children}</span>
      </code>
    );
  },
});

module.exports = Dial;
