var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('timeout-transition-group');

var _ = require('lodash');
var cx = require('classnames');

var CapsLock = require('./CapsLock.react.js');
var ChefBox = require('./ChefBox.react.js');
var DifficultySelect = require('./DifficultySelect.react.js');
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
    };
  },

  setStateDelay: function(state, delay) {
    delay = delay || 500;
    this.setState({gameState: ''});
    this.setTimeout(() => this.setState({gameState: state}), delay);
  },

  onStartGame: function() {
    // Assign recipes based on selected meal (updating chef names)
    var chefs = Recipes[this.state.meal].recipes;
    chefs[0].chefName = 'Chef de cuisine';
    chefs[1].chefName = 'Sous-chef';

    this.setStateDelay('loading', 500);

    // Wait a bit to fade out
    this.setTimeout(() => {
      this.setState({
        gameState: 'started',
        stillAlive: 4,
        chefs: chefs,
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

  renderTitle: function(fade) {
    return (
      <div className={cx('padTop', 'fade', {'fade-active': !fade})}>
        <p>Type <Inst clear onComplete={_.partial(this.setStateDelay, 'menu')}>start</Inst> to begin</p>
        <p>Type <Inst clear onComplete={_.partial(this.setStateDelay, 'help')}>help</Inst> for instructions</p>
      </div>
    );
  },

  onDifficultyProgress: function(val) {
    this.setState({meal: val});
  },

  renderRecipeMenu: function(fade) {
    return (
      <div className={cx('fade', {'fade-active': !fade})}>
        <DifficultySelect onProgress={this.onDifficultyProgress} />
        <br/>
        <p>Select a meal with the arrow keys.</p>
        <Inst onComplete={this.onStartGame}>play</Inst>
      </div>
    );
  },

  renderHelp: function(fade) {
    var heartFull = <span className="fireRed glyphicon glyphicon-heart" />;
    var heartEmpty = <span className="lightRed glyphicon glyphicon-heart-empty" />;
    var timer = <span className="glyphicon glyphicon-hourglass" />;

    return (
      <div className={cx('fade', {'fade-active': !fade})}>
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

  renderLoading: function(fade) {
    var loadingText = [
      'Compiling recipes...',
      'Donning chef hats...',
      'Sharpening knives...',
      'Wiping counters...'
    ];
    // TODO: add loading tips?

    return (
      <div className={cx('fade', {'fade-active': !fade})}>
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

    var showState = (state) => this.state.gameState === state;
    var headerClass = showState('title') ? '' : 'vtop';

    // TODO: instead of hiding, put all rendered subclasses in a TransitionGroup and add/remove from array
    return (
      <div className="center">
        <div className={cx('vcenter', headerClass)}>
          <h1>Too Many Chefs</h1>
          <h4>A text-based cooperative cooking game</h4>
        </div>

        {this.renderTitle(showState('title'))}
        {this.renderRecipeMenu(showState('menu'))}
        {this.renderHelp(showState('help'))}
        {this.renderLoading(showState('loading'))}
        <CapsLock />
      </div>
    );
  },
});

module.exports = Game;
