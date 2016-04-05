var React = require('react');

var SoundEffects = require('./SoundEffects.js');

var Mash = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    mashCount: React.PropTypes.number,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      mashCount: 20,
    };
  },

  getInitialState: function() {
    return {
      value: this.props.mashCount,
    };
  },

  componentDidMount: function() {
    window.addEventListener('keyup', this.onKeyUp);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keyup', this.onKeyUp);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onProgress(this.state.value);
    }
  },

  onKeyUp: function(e) {
    if (this.state.value === 0) {
      return;
    }

    var keyCode = e.which || e.keyCode || 0;
    if (String.fromCharCode(keyCode).toLowerCase() === this.props.children || (this.props.children === 'CAPSLOCK' && keyCode === 20)) {
      SoundEffects.playRandomClick();

      var newValue = this.state.value - 1;
      this.setState({value: newValue});

      if (this.props.onComplete && newValue === 0) {
        this.props.onComplete();
      }
    }
  },

  render: function() {
    return (
      <span className="center">
        <br/>
        <code>
          <span className="input">{this.props.children}</span> × {this.state.value}
        </code>
      </span>
    );
  },
});

module.exports = Mash;
