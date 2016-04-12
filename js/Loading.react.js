var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('react-addons-css-transition-group');

var _ = require('lodash');

var loadingText = [
  'Compiling recipes',
  'Donning chef hats',
  'Sharpening knives',
  'Wiping counters',
  'Scrubbing dishes',
  'Gathering ingredients',
  'Allocating cutlery',
  'Tying aprons',
  'Cleaning utensils',
  'Taking orders',
  'Chasing rats',
  'Wringing dish towels',
  'Turning on the radio',
  'Sweeping floors',
  'Washing hands',
  'Rolling up sleeves',
];

var Loading = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      content: <span>Preparing kitchen...</span>,
    };
  },

  componentDidMount: function() {
    this.updateLoadingText();
  },

  updateLoadingText: function() {
    if (loadingText.length > 0) {
      var newText = _.pullAt(loadingText, _.random(0, loadingText.length - 1));
      var content = <span>{newText[0]}...</span>;
      this.setState({content: null});
      this.setTimeout(this.updateLoadingText, _.random(500, 5000));
      this.setTimeout(() => this.setState({content: content}), 250);
    }
  },

  render: function() {
    return (
      <TransitionGroup transitionName="fade"
                       transitionEnterTimeout={250}
                       transitionLeaveTimeout={250}>
        {this.state.content}
      </TransitionGroup>
    );
  },
});

module.exports = Loading;
