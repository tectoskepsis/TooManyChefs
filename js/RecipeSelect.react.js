var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('react-addons-css-transition-group');

var _ = require('lodash');
var cx = require('classnames');

var Inst = require('./Instruction.react.js');
var Recipes = require('./recipes/Recipes.js');
var SoundEffects = require('./SoundEffects.js');

var RecipeSelect = React.createClass({
  mixins: [TimerMixin],

  propTypes: {
    onProgress: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      value: 0,
      content: this.renderRecipe(0),
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

      // Update content for transition
      this.setState({content: null});
      this.setTimeout(() => this.setState({
        content: this.renderRecipe(this.state.value),
      }), 250);
    }
  },

  onKeyDown: function(e) {
    var keyCode = e.which || e.keyCode || 0;
    if (keyCode === 37 && this.state.value > 0) {
      // left arrow pressed
      SoundEffects.playRandomClick();
      this.setState({value: this.state.value - 1});
    } else if (keyCode === 39 && this.state.value < Recipes.length - 1) {
      // right arrow pressed
      SoundEffects.playRandomClick();
      this.setState({value: this.state.value + 1});
    }
  },

  renderRecipe: function(i) {
    var meal = Recipes[i];
    var emptyStar = (i) => <span key={i} className="lightBlue glyphicon glyphicon-star-empty" />;
    var fullStar = (i) => <span key={i} className="darkBlue glyphicon glyphicon-star" />;

    return (
      <div className={cx('padTop', {locked: meal.locked})}>
        <h4>{meal.name}</h4>
        <p>
          Difficulty: {_.range(5).map((i) => i < meal.rating ? fullStar(i) : emptyStar(i))}
        </p>
        {meal.locked ? <h4 className="fireRed">Coming Soon</h4> : <br/>}

        {meal.recipes.map((r, i) => (
          <div key={i}>{meal.locked ? '??????' : r.name} ({r.type})</div>
        ))}

        <br/>
      </div>
    );
  },

  render: function() {
    var locked = Recipes[this.state.value].locked;

    return (
      <div>
        <TransitionGroup transitionName="fade"
                         transitionEnterTimeout={250}
                         transitionLeaveTimeout={250}>
          {this.state.content}
        </TransitionGroup>

        <div className="padTop">
          <span className="padRight10 glyphicon glyphicon-triangle-left" />
          {_.range(Recipes.length).map((i) =>
             <span key={i} className={cx('dot', {active: this.state.value === i})} />)}
          <span className="padLeft10 glyphicon glyphicon-triangle-right" />
        </div>
        <br/>
        <p>Select a meal with the arrow keys.</p>
        <Inst onComplete={this.props.onSelect} disabled={locked}>play</Inst>
      </div>
    );
  },
});

module.exports = RecipeSelect;
