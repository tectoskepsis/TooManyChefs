var React = require('react');

var Counter = React.createClass({
  propTypes: {
    children: React.PropTypes.number,
    stepValue: React.PropTypes.number,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      stepValue: 5,
    };
  },

  getInitialState: function() {
    return {
      value: this.props.children,
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
    if (keyCode === 38) {
      // up arrow pressed
      this.setState({value: this.state.value + this.props.stepValue});
    } else if (keyCode === 40) {
      // down arrow pressed
      this.setState({value: this.state.value - this.props.stepValue});
    }
  },

  render: function() {
    return (
      <code>
        {this.state.value}
        <span className="input glyphicon glyphicon-resize-vertical" />
      </code>
    );
  },
});

module.exports = Counter;
