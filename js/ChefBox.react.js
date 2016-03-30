var Progress = require('rc-progress').Line;
var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('timeout-transition-group');

var chroma = require('chroma-js');
var cx = require('classnames');

var Instruction = require('./Instruction.react.js');
var RecipeStep = require('./RecipeStep.react.js');

var ChefBox = React.createClass({
  mixins: [TimerMixin],

  propTypes: {
    chefId: React.PropTypes.number.isRequired,
    chefName: React.PropTypes.string.isRequired,
    recipe: React.PropTypes.object.isRequired,
    onFailure: React.PropTypes.func.isRequired,
    stillAlive: React.PropTypes.number.isRequired,
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
      startTime: 10,
      timer: 10,
      onTimeout: this.nextStep,
      progress: 0,
      backgroundClass: '',
      content: null,
      popups: [],
      lives: 3,
      rescue: 0, // how many times been rescued
      gameOver: false, // true if lost or won
    };
  },

  componentDidMount: function() {
    this.timerInterval = this.setInterval(this.updateTimer, 1000);
    this.setState({content: this.renderRecipeStart()});
  },

  updateTimer: function() {
    if (this.state.timer > 0) {
      var newTime = this.state.timer - 1;
      this.setState({timer: newTime});

      if (newTime === 0) {
        this.onTimeout();
      }
    }
  },

  onTimeout: function() {
    this.clearInterval(this.timerInterval);
    if (this.state.onTimeout) {
      this.state.onTimeout(this.state.progress);
    } else {
      this.failure();
    }
  },

  gameOver: function(text) {
    if (this.state.gameOver) {
      return;
    }

    this.clearInterval(this.timerInterval);
    this.setState({
      content: null,
      popups: [],
      backgroundClass: 'failure',
      timer: 0,
      gameOver: true,
    });

    // Wait 250ms before updating for fade effect
    this.setTimeout(() => {
      this.setState({content: this.renderFailure(text)});
    }, 250);
  },

  nextStep: function(postFail) {
    var newStep = this.state.step + 1;
    this.clearInterval(this.timerInterval);
    if (!postFail) {
      this.setState({backgroundClass: 'success'});
    }

    // Completed recipe
    if (newStep === this.props.recipe.steps.length) {
      this.setState({
        content: null,
        backgroundClass: '',
        timer: 0,
        gameOver: true,
      });

      // Wait 250ms before updating for fade effect
      this.setTimeout(() => this.setState({
        backgroundClass: 'success',
        content: this.renderRecipeDone(),
        step: newStep,
      }), 250);

    } else {
      var {timer, onStart, onTimeout, ...stepProps} = this.props.recipe.steps[newStep];
      if (!stepProps.onComplete) {
        stepProps.onComplete = this.nextStep;
      } else {
        stepProps.onComplete = stepProps.onComplete.bind(
          this, this.state.progress, this.state.timer);
      }

      // Clear content of recipe step first
      this.setState({
        content: null,
        startTime: timer,
        timer: timer,
        onTimeout: onTimeout ? onTimeout.bind(this) : null,
      });

      // Wait 250ms before updating for fade effect
      this.setTimeout(() => {
        this.timerInterval = this.setInterval(this.updateTimer, 1000);
        this.setState({
          backgroundClass: '',
          content: <RecipeStep onProgress={this.onProgress} {...stepProps} />,
          step: newStep,
        });

        if (onStart) {
          onStart.apply(this);
        }
      }, 250);
    }
  },

  failure: function(text) {
    if (this.state.lives === 0) {
      return;
    }

    var livesLeft = this.state.lives - 1;
    this.setState({
      content: null,
      popups: [],
      backgroundClass: 'failure',
      lives: livesLeft,
    });

    // Wait 250ms before updating for fade effect
    this.setTimeout(() => {
      if (livesLeft === 0) {
        this.timerInterval = this.setInterval(this.updateTimer, 1000);
        this.setState({
          startTime: 10,
          timer: 10,
          onTimeout: this.onRescueTimeout,
          content: this.renderRescue(),
          rescue: 0,
        });
        this.props.onFailure(true);
      } else {
        this.nextStep(true);
      }
    }, 250);
  },

  onRescueTimeout: function() {
    this.clearInterval(this.timerInterval);
    this.setState({content: null});

    this.setTimeout(() => {
      this.setState({content: this.renderFailure()});
      this.props.onFailure(false);
    });
  },

  onProgress: function(progress) {
    this.setState({progress: progress});
  },

  showRescuePopup: function(chefName, onRescue) {
    var popups = this.state.popups;
    var item = popups.length;
    popups.push(this.renderRescuePopup(chefName, onRescue, item));
    this.setState({popups: popups});
  },

  hidePopup: function(i) {
    var popups = this.state.popups;
    _.pullAt(popups, i); // remove popup i
    this.setState({popups: popups});
  },

  rescue: function(onRescued) {
    var rescueCount = this.state.rescue + 1;

    // No longer need rescuing
    if (rescueCount >= this.props.stillAlive) {
      this.setState({lives: 1});
      this.nextStep(true);
      onRescued();
    } else {
      this.setState({rescue: rescueCount});
    }
  },

  renderRescuePopup: function(name, onRescue, i) {
    var rescueText = ['save', 'rescue', 'help', 'assist', 'support', 'inspire'];
    var callback = () => {
      this.hidePopup(i);
      onRescue();
    };

    return {
      type: 'danger',
      content: (
        <span>
          {name} is failing! Type <Instruction onComplete={callback}>{_.sample(rescueText)}</Instruction> to aid them.
        </span>
      ),
    };
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
    return (
      <span className="padLeft">
        <span className="glyphicon glyphicon-hourglass" />
        [{padZero(min)}:{padZero(sec)}]
      </span>
    );
  },

  renderTimer: function() {
    if (this.state.timer === 0) {
      return null;
    }

    var progress = this.state.timer === this.state.startTime
      ? 1
      : (this.state.timer - 1.4) / (this.state.startTime - 1);

    // Scale color from red to blue based on time
    var scale = chroma.scale(['#ff0500', '#ffd320', '#659cf3']);
    var color = scale(progress).hex();

    return (
      <Progress className="timer" percent={progress * 100} strokeWidth="2" strokeColor={color} />
    );
  },

  renderRecipeStart: function() {
    return (
      <div>
        <b>{this.props.recipe.name}</b> - {this.props.recipe.type} ({this.props.recipe.difficulty})
        <h5>Ingredients</h5>
        <ul className="ingredients">
          {this.props.recipe.ingredients.map((ing, i) =>
            <li key={i}>{ing}</li>)}
        </ul>
        <p>{this.props.recipe.description}</p>
      </div>
    );
  },

  renderFailure: function(text) {
    text = text || <p>Out of time!</p>;
    return (
      <div>
        <h4>GAME OVER - RECIPE FAILED</h4>
        <p>Steps completed: {this.state.step}/{this.props.recipe.steps.length}</p>
        {text}
      </div>
    );
  },

  renderRescue: function() {
    return (
      <div>
        <h4>RECIPE FAILED</h4>
        <p>Ask the other chefs to save you.</p>
      </div>
    );
  },

  renderRecipeDone: function() {
    return (
      <div>Great work! You've completed the recipe for {this.props.recipe.name}.</div>
      // TODO: include total time taken
    );
  },

  renderLives: function() {
    var heartFull = (i) => <span key={i} className="fireRed glyphicon glyphicon-heart" />;
    var heartEmpty = (i) => <span key={i} className="lightRed glyphicon glyphicon-heart-empty" />;

    return (
      <span className="padLeft">
        {_.range(3).map(i => this.state.lives > i ? heartFull(i) : heartEmpty(i))}
      </span>
    );
  },

  render: function() {
    var classes = cx('col-xs-12', 'col-sm-6',
      {[`col-md-${this.props.widthClass}`]: true}
    );
    var style = {height: window.innerHeight / 2 - 20};

    return (
      <div className={classes}>
        <div className={cx('chefBox', this.state.backgroundClass)} style={style}>
          <h4>{this.props.chefName} {this.renderLives()} {this.renderTime()}</h4>
          {this.renderTimer()}
          <div className="padTop">
            <TransitionGroup enterTimeout={250}
                             leaveTimeout={250}
                             transitionName="fade">
              {this.state.content}
              {this.state.popups.map((popup, i) =>
                <div key={i} className={cx('popup', 'alert', 'alert-' + popup.type)}>
                  {popup.content}
                </div>)}
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = ChefBox;
