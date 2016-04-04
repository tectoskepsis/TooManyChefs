var React = require('react');

var TextInput = React.createClass({
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

  componentDidMount: function() {
    window.addEventListener('keypress', this.onKeyPress);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keypress', this.onKeyPress);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onProgress(this.state.value);
    }
  },

  onKeyPress: function(e) {
    var keyCode = e.which || e.keyCode || 0;
    if (keyCode === 13) { // enter pressed
      // TODO: decide if we should use enter?
      /*if (this.state.value && this.props.onComplete) {
        this.props.onComplete(this.state.value);
      }*/
      return;
    }

    // normal key (only accept alphanumeric values)
    var key = String.fromCharCode(keyCode);
    if (/[a-zA-Z0-9-_ ]/.test(key)) {
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
