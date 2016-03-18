var React = require('react');

var Instruction = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    onComplete: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      complete: false,
      progress: 0,
    };
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.onKeyDown);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.onKeyDown);
  },

  onKeyDown: function(e) {
    if (this.state.complete) {
      return;
    }

    if (e.keyCode + 32 === this.props.text.charCodeAt(this.state.progress)) {
      var newProgress = this.state.progress + 1;
      var complete = newProgress === this.props.text.length;
      this.setState({
        progress: newProgress,
        complete: complete,
      });

      if (complete && this.props.onComplete) {
        this.props.onComplete();
      }
    }
  },

  render: function() {
    var prefix = this.props.text.substring(0, this.state.progress);
    var suffix = this.props.text.substring(this.state.progress);
    return (
      <code>
        <span className="input">{prefix}</span>
        <span>{suffix}</span>
      </code>
    );
  },
});

module.exports = Instruction;
