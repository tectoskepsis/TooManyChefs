var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('react-addons-css-transition-group');

var _ = require('lodash');
var cx = require('classnames');

var CapsLock = require('./CapsLock.react.js');
var ChefBox = require('./ChefBox.react.js');
var RecipeSelect = require('./RecipeSelect.react.js');
var Inst = require('./Instruction.react.js');
var Recipes = require('./recipes/Recipes.js');

var Game = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      gameState: 'title',  // title | help | menu | started | loading
      chefs: [],
      stillAlive: 0,
      meal: 0,
      content: this.renderTitle(),
    };
  },

  setStateDelay: function(state, delay) {
    delay = delay || 500;

    var renderContent = _.noop;
    switch (state) {
      case 'title':
        renderContent = this.renderTitle;
        break;
      case 'help':
        renderContent = this.renderHelp;
        break;
      case 'menu':
        renderContent = this.renderRecipeMenu;
        break;
      case 'loading':
        renderContent = this.renderLoading;
        break;
    }

    this.setState({
      gameState: '',
      content: null,
    });
    this.setTimeout(() => this.setState({
      gameState: state,
      content: renderContent(),
    }), delay);
  },

  onStartGame: function() {
    // Assign recipes based on selected meal
    this.setStateDelay('loading', 500);

    // Wait a bit to fade out
    this.setTimeout(() => {
      this.setState({
        gameState: 'started',
        stillAlive: 4,
        chefs: Recipes[this.state.meal].recipes,
      });
    }, 3000);
  },

  onFailure: function(loser, canSave) {
    var stillAlive = this.state.stillAlive - 1;
    var chefs = this.state.chefs;
    chefs[loser].dead = true;
    this.setState({
      stillAlive: stillAlive,
      chefs: chefs,
    });

    // Propagate failure to everyone
    for (var i = 0; i < 4; i++) {
      if (i === loser) {
        continue;
      }

      var chef = this.refs['chef' + i];
      var chefName = chefs[loser].chefName;

      if (canSave && stillAlive > 0) {
        if (!chefs[i].dead) {
          chef.showRescuePopup(chefName,
            () => this.refs['chef' + loser].rescue(loser));
        }
      } else {
        chef.gameOver(
          <div>
            <p>{chefName} failed to complete their recipe!</p>
            {stillAlive === 0 && 'Press Ctrl-R to start over.'}
          </div>
        );
      }
    }
  },

  // When rescued, unset dead and increment stillAlive
  onRescued: function(loser) {
    var chefs = this.state.chefs;
    chefs[loser].dead = false;
    this.setState({
      chefs: chefs,
      stillAlive: this.state.stillAlive + 1,
    });
  },

  onComplete: function(winner) {
    var chefs = this.state.chefs;
    chefs[loser].dead = true; // mark "dead" so they can't get popups
    var stillAlive = this.state.stillAlive - 1;
    this.setState({
      chefs: chefs,
      stillAlive: stillAlive,
    });

    return stillAlive === 0 && 'Press Ctrl-R to play again.';
  },

  renderTitle: function() {
    return (
      <div className="padTop">
        <p>Type <Inst clear onComplete={_.partial(this.setStateDelay, 'menu')}>start</Inst> to begin</p>
        <p>Type <Inst clear onComplete={_.partial(this.setStateDelay, 'help')}>help</Inst> for instructions</p>
      </div>
    );
  },

  onRecipeProgress: function(val) {
    this.setState({meal: val});
  },

  renderRecipeMenu: function() {
    return (
      <div>
        <RecipeSelect onProgress={this.onRecipeProgress} />
        <br/>
        <p>Select a meal with the arrow keys.</p>
        <Inst onComplete={this.onStartGame}>play</Inst>
      </div>
    );
  },

  renderHelp: function() {
    var heartFull = <span className="fireRed glyphicon glyphicon-heart" />;
    var heartEmpty = <span className="lightRed glyphicon glyphicon-heart-empty" />;
    var timer = <span className="glyphicon glyphicon-hourglass" />;

    return (
      <div className="padTop">
        <h4>A Chef's Guide</h4>
        <p>Follow the instructions, step by step, to complete your recipe!</p>
        <br/>

        <p>You may need to <Inst onComplete={_.noop}>type a command</Inst>,<br/> move a dial with the arrow keys, <br/> and more.</p>
        <br/>

        <p>Watch your health {heartFull}{heartFull}{heartEmpty}<br/> and complete each step before the {timer} timer runs out!</p>
        <br/>

        <p>And last but not least... be mindful of the other chefs in the kitchen!<br/> You're all in this together.</p>
        <br/>
        <br/>
        <p>Type <Inst clear onComplete={_.partial(this.setStateDelay, 'title')}>back</Inst> to return to title</p>
      </div>
    );
  },

  renderLoading: function() {
    var loadingText = [
      'Compiling recipes...',
      'Donning chef hats...',
      'Sharpening knives...',
      'Wiping counters...'
    ];
    // TODO: add loading tips?

    return (
      <div>
        {_.sample(loadingText)}
      </div>
    );
  },

  renderChefBoxes: function() {
    return (
      <div>
        {this.state.chefs.map((recipe, i) =>
          <ChefBox key={i} ref={'chef' + i} chefId={i}
                   chefName={recipe.chefName}
                   recipe={recipe}
                   onFailure={_.partial(this.onFailure, i)}
                   onComplete={this.onComplete}
                   onRescued={this.onRescued}
                   stillAlive={this.state.stillAlive}
          />)}
      </div>
    );
  },

  render: function() {
    if (this.state.gameState === 'started') {
      return this.renderChefBoxes();
    }

    return (
      <div className="center">
        <div className={cx('vcenter', {vtop: this.state.gameState !== 'title'})}>
          <h1>Too Many Chefs</h1>
          <h4>A text-based cooperative cooking game</h4>
        </div>

        <TransitionGroup transitionName="fade"
                         transitionEnterTimeout={250}
                         transitionLeaveTimeout={250}>
          {this.state.content}
          <CapsLock />
        </TransitionGroup>
      </div>
    );
  },
});

module.exports = Game;
