var React = require('react');

var _ = require('lodash');
var cx = require('classnames');

var Audio = require('./Audio.js');
var KeyboardMixin = require('./KeyboardMixin.react.js');

var Instruction = React.createClass({
  mixins: [KeyboardMixin],

  propTypes: {
    children: React.PropTypes.string.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    reset: React.PropTypes.bool,
    onHoldSound: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      complete: false,
      progress: 0,
      playingSound: false,
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.onProgress && this.state.progress != prevState.progress) {
      this.props.onProgress(this.state.progress);
    }
  },

  onKeyUp: function() {
    if (this.props.onHoldSound && this.state.playingSound) {
      Audio.pauseSE(this.props.onHoldSound);
      this.setState({playingSound: false});
    }
  },

  checkHeldKey: function() {
    if (this.state.complete || this.props.disabled) {
      return;
    }

    if (this.isKeyPressed(this.props.children.charAt(this.state.progress))) {
      if (!this.props.onHoldSound) {
        Audio.playRandomClick();
      } else if (!this.state.playingSound) {
        Audio.playSE(this.props.onHoldSound);
        this.setState({playingSound: true});
      }

      var newProgress = this.state.progress + 1;
      while (newProgress < this.props.children.length && this.props.children.charAt(newProgress) === ' ') {
        newProgress++; // skip spaces
      }
      var complete = newProgress === this.props.children.length;
      this.setState({
        progress: newProgress,
        complete: complete,
      });

      if (complete && this.props.onComplete) {
        this.props.onComplete();
      }
      if (complete && this.props.reset) {
        this.setTimeout(() => this.setState({
          progress: 0,
          complete: false,
        }), 250);
      }
    }
  },

  render: function() {
    var prefix = this.props.children.substring(0, this.state.progress);
    var suffix = this.props.children.substring(this.state.progress);
    return (
      <code className={cx({locked: this.props.disabled})}>
        <span className="input">{prefix}</span>
        <u>{suffix.substring(0, 1)}</u>
        <span>{suffix.substring(1)}</span>
      </code>
    );
  },
});

module.exports = Instruction;
