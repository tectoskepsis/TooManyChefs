var React = require('react');

var TextInput = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    onComplete: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      value: '',
    };
  },

  componentDidMount: function() {
    window.addEventListener('keypress', this.onKeyPress);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keypress', this.onKeyPress);
  },

  onKeyPress: function(e) {
    var keyCode = e.which || e.keyCode || 0;
    if (keyCode === 13) { // enter pressed
      if (this.state.value && this.props.onComplete) {
        this.props.onComplete(this.state.value);
      }
      return;
    }

    // normal key
    var newValue = this.state.value.concat(String.fromCharCode(keyCode));
    this.setState({value: newValue});
  },

  render: function() {
    return (
      <span>
        {this.props.children}
        <code>
          <span className="input">{this.state.value}</span>
        </code>
      </span>
    );
  },
});

module.exports = TextInput;
