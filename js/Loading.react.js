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
  'Sweeping floors',
  'Washing hands',
  'Rolling up sleeves',
  'Polishing tables',
  'Folding napkins',
  'Freezing ice cubes',
  'Buttering toast',
  'Stirring coffee',
  'Milking cows',
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
    this.setState({content: null});
    var content;
    if (loadingText.length > 0) {
      var newText = _.pullAt(loadingText, _.random(0, loadingText.length - 1));
      content = <span>{newText[0]}...</span>;
      this.setTimeout(this.updateLoadingText, _.random(300, 5000));
      this.setTimeout(() => this.setState({content: content}), 250);
    } else {
      content = <span>Running out of tasks while game loads...</span>;
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
