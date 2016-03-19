var React = require('react');
var TimerMixin = require('react-timer-mixin');

var cx = require('classnames');

var RecipeStep = require('./RecipeStep.react.js');

var ChefBox = React.createClass({
  mixins: [TimerMixin],

  propTypes: {
    chefId: React.PropTypes.number.isRequired,
    recipe: React.PropTypes.object.isRequired,
    widthClass: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      widthClass: 6,
    };
  },

  getInitialState: function() {
    return {
      step: -1,
      timer: 10,
      decrement: true,
      onTimeout: this.nextStep,
      content: null,
    };
  },

  componentDidMount: function() {
    this.setInterval(this.updateTimer, 1000);
  },

  updateTimer: function() {
    if (this.state.timer > 0) {
      var newTime = this.state.timer + (this.state.decrement ? -1 : 1);
      this.setState({timer: newTime});

      if (newTime === 0) {
        this.onTimeout();
      }
    }
  },

  onTimeout: function() {
    if (this.state.onTimeout) {
      this.state.onTimeout();
    } else {
      // TODO: lose
      console.log('out of time!');
    }
  },

  nextStep: function() {
    var newStep = this.state.step + 1;
    if (newStep === this.props.recipe.steps.length) {
      // TODO: done with recipe
      this.setState({step: newStep});
      console.log('completed recipe!');
    } else {
      var {timer, increment, onTimeout, ...stepProps} = this.props.recipe.steps[newStep];
      if (!stepProps.onComplete) {
        stepProps.onComplete = this.nextStep;
      }
      // Clear content of recipe step first
      this.setState({content: null});

      this.setState({
        timer: timer,
        decrement: !increment,
        onTimeout: onTimeout,
        content: <RecipeStep {...stepProps} />,
        step: newStep,
      });
    }
  },

  renderTime: function() {
    if (this.state.timer === 0) {
      return null;
    }

    function padZero(num) {
      return (num < 10 ? '0' : '') + num.toString();
    }
    var min = Math.floor(this.state.timer / 60);
    var sec = this.state.timer % 60;
    return padZero(min) + ':' + padZero(sec);
  },

  render: function() {
    var classes = cx('chefBox', 'col-xs-12', 'col-sm-6',
      {[`col-md-${this.props.widthClass}`]: true}
    );

    var content = this.state.step < 0
      ? <div>
          <b>{this.props.recipe.name}</b> ({this.props.recipe.difficulty})
          <h5>Ingredients</h5>
          <ul className="ingredients">
            {this.props.recipe.ingredients.map((ing, i) =>
              <li key={i}>{ing}</li>)}
          </ul>
          <p>{this.props.recipe.description}</p>
        </div>
      : this.state.step === this.props.recipe.steps.length
      ? <div>Recipe complete!</div>
      : this.state.content;

    return (
      <div className={classes}>
        <h5>Chef {this.props.chefId + 1}</h5>
        <h5 className="pull-right">{this.renderTime()}</h5>
        {content}
      </div>
    );
  },
});

module.exports = ChefBox;
