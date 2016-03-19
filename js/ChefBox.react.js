var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('timeout-transition-group');

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
    this.timerInterval = this.setInterval(this.updateTimer, 1000);
    this.setState({
      content: this.renderRecipeStart(),
    });
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
    this.clearInterval(this.timerInterval);
    if (this.state.onTimeout) {
      this.state.onTimeout();
    } else {
      // TODO: lose
      console.log('out of time!');
    }
  },

  nextStep: function() {
    var newStep = this.state.step + 1;
    this.clearInterval(this.timerInterval);

    // Completed recipe
    if (newStep === this.props.recipe.steps.length) {
      this.setState({
        content: null,
        timer: 0,
      });

      // Wait 250ms before updating for fade effect
      this.setTimeout(() => this.setState({
        content: this.renderRecipeDone(),
        step: newStep,
      }), 250);

    } else {
      var {timer, increment, onTimeout, ...stepProps} = this.props.recipe.steps[newStep];
      if (!stepProps.onComplete) {
        stepProps.onComplete = this.nextStep;
      }

      // Clear content of recipe step first
      this.setState({
        content: null,
        timer: timer,
        decrement: !increment,
        onTimeout: onTimeout,
      });

      // Wait 250ms before updating for fade effect
      this.setTimeout(() => {
        this.timerInterval = this.setInterval(this.updateTimer, 1000);
        this.setState({
          content: <RecipeStep {...stepProps} />,
          step: newStep,
        });
      }, 250);
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

  renderRecipeStart: function() {
    return (
      <div>
        <b>{this.props.recipe.name}</b> ({this.props.recipe.difficulty})
        <h5>Ingredients</h5>
        <ul className="ingredients">
          {this.props.recipe.ingredients.map((ing, i) =>
            <li key={i}>{ing}</li>)}
        </ul>
        <p>{this.props.recipe.description}</p>
      </div>
    );
  },

  renderRecipeDone: function() {
    return (
      <div>Recipe complete!</div>
    );
  },

  render: function() {
    var classes = cx('chefBox', 'col-xs-12', 'col-sm-6',
      {[`col-md-${this.props.widthClass}`]: true}
    );

    return (
      <div className={classes}>
        <h5>Chef {this.props.chefId + 1}</h5>
        <h5 className="pull-right">{this.renderTime()}</h5>
        <TransitionGroup enterTimeout={250}
                         leaveTimeout={250}
                         transitionName="fade">
          {this.state.content}
        </TransitionGroup>
      </div>
    );
  },
});

module.exports = ChefBox;
