var React = require('react');

require('./helper.js');

var Dial = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    maxValue: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      maxValue: 50,
    };
  },

  getInitialState: function() {
    return {
      value: 0,
    };
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.onKeyDown);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.onKeyDown);
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
