var React = require('react');

var cx = require('classnames');

var Audio = require('../Audio.js');
var KeyboardMixin = require('../KeyboardMixin.react.js');

var Counter = React.createClass({
  mixins: [KeyboardMixin],

  propTypes: {
    children: React.PropTypes.number,
    stepValue: React.PropTypes.number,
    goalValue: React.PropTypes.number,
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
      colorClass: 'input',
      value: this.props.children,
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onProgress(this.state.value);
    }
  },

  onKeyDown: function(e) {
    var key = e.key;
    if (key === 'ArrowUp') {
      // up arrow pressed
      Audio.playRandomClick();

      var newValue = this.state.value + this.props.stepValue;
      this.setState({value: newValue});
      if (newValue === this.props.goalValue) {
        this.setState({colorClass: 'correct'});
      } else {
        this.setState({colorClass: 'input'});
      }
    } else if (key === 'ArrowDown') {
      // down arrow pressed
      Audio.playRandomClick();

      var newValue = this.state.value - this.props.stepValue;
      this.setState({value: newValue});
      if (newValue === this.props.goalValue) {
        this.setState({colorClass: 'correct'});
      } else {
        this.setState({colorClass: 'input'});
      }
    }
  },

  render: function() {
    return (
      <div className="padTop center">
        <br/>
        <code>
          [<span className={cx(this.state.colorClass)}>{this.state.value}</span>]
          <span className="glyphicon glyphicon-resize-vertical" />
        </code>
      </div>
    );
  },
});

module.exports = Counter;
