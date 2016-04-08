var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('react-addons-css-transition-group');

var _ = require('lodash');
var cx = require('classnames');

var CapsLock = require('./CapsLock.react.js');
var ChefBox = require('./ChefBox.react.js');
var RecipeSelect = require('./RecipeSelect.react.js');
var Inst = require('./Instruction.react.js');
var Recipes = require('./recipes/Recipes.js');

const LOADING_TEXT = [
  'Compiling recipes',
  'Donning chef hats',
  'Sharpening knives',
  'Wiping counters',
  'Scrubbing dishes',
  'Gathering ingredients',
  'Allocating cutlery',
  'Tying aprons',
];

var Game = React.createClass({
  mixins: [PureRenderMixin, TimerMixin],

  getInitialState: function() {
    return {
      gameState: 'title',  // title | help | menu | started | loading
      chefs: [],
      stillAlive: 0,
      meal: 0,
      content: this.renderTitle(),
      startTime: 0,
      singlePlayer: false,
      fadeTitle: false,
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
      case 'credits':
        renderContent = this.renderCredits;
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
    this.setStateDelay('loading', 500);

    // Send Google Analytics event
    ga('send', 'event', 'Game', 'play', Recipes[this.state.meal].name);

    // Wait a random amount of time before loading (3-5s)
    this.setTimeout(() => {
      this.setState({
        gameState: 'started',
        stillAlive: 0,
        chefs: Recipes[this.state.meal].recipes,
        startTime: new Date().getTime(),
      });
    }, 500 + _.random(3000, 5000));
  },

  onChooseMode: function(singlePlayer) {
    if (this.state.singlePlayer !== singlePlayer) {
      this.setState({fadeTitle: true});
      this.setTimeout(() => this.setState({
        singlePlayer: singlePlayer,
        fadeTitle: false,
      }), 350);

      this.setTimeout(() => {
        this.setStateDelay('menu');
      }, 1500);
    } else {
      this.setStateDelay('menu', 500);
    }
  },

  onReady: function(player) {
    var stillAlive = this.state.stillAlive + 1;
    var chefs = this.state.chefs;
    chefs[player].ready = true;
    this.setState({
      chefs: chefs,
      stillAlive: stillAlive,
    });

    // Are all chefs ready to begin?
    if (stillAlive === 4) {
      for (var i = 0; i < 4; i++) {
        var chef = this.refs['chef' + i];
        chef.startGame();
      }
      return true;
    }
    return false;
  },

  onFailure: function(loser, canSave) {
    var stillAlive = this.state.stillAlive - 1;
    if (stillAlive < 0) {
      return;
    }
    if (!canSave || stillAlive === 0) {
      // Send Google Analytics event
      ga('send', 'event', 'Game', 'lose', Recipes[this.state.meal].name);
    }

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
    if (this.state.stillAlive === 0) {
      // Send Google Analytics event
      ga('send', 'event', 'Game', 'win', Recipes[this.state.meal].name);
      return 'Press Ctrl-R to play again.';
    }
    return null;
  },

  onRenderMode: function() {
    this.setState({content: null});
    this.setTimeout(() => this.setState({
      content: this.renderMode(),
    }), 500);
  },

  renderTitle: function() {
    return (
      <div className="padTop">
        <p>Type <Inst onComplete={this.onRenderMode}>start</Inst> to begin</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'help')}>help</Inst> for instructions</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'credits')}>credits</Inst> for culinary staff</p>
      </div>
    );
  },

  renderMode: function() {
    return (
      <div className="padTop">
        <p>Select mode:</p>
        <br/>

        <p><Inst onComplete={_.partial(this.onChooseMode, true)}>solo</Inst> (single-player)</p>
        <p><Inst onComplete={_.partial(this.onChooseMode, false)}>party</Inst> (2-4 players)</p>
      </div>
    );
  },

  onRecipeProgress: function(val) {
    this.setState({meal: val});
  },

  renderRecipeMenu: function() {
    return (
      <div>
        <RecipeSelect onProgress={this.onRecipeProgress}
                      onSelect={this.onStartGame} />
        <Inst onComplete={_.partial(this.setStateDelay, 'title')}>back</Inst>
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
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'title')}>back</Inst> to return to title</p>
      </div>
    );
  },

  renderLoading: function() {
    // TODO: add loading tips?
    // TODO: animate ellipses

    return (
      <div className="padTop vcenter vtop">
        {_.sample(LOADING_TEXT)}...
      </div>
    );
  },

  renderCredits: function() {
    return (
      <div className="padTop">
        <br/><br/>
        <h4>Credits</h4>
        <p>
          <b>Chef de cuisine</b> (designer): Ivan Wang<br/>
          <b>Sous-chef</b> (programmer): Ivan Wang<br/>
          <b>Culinary consultant</b>: Anshu Bansal<br/>
          <b>Cafe jazz</b>: <i>Fortaleza</i> by Topher Mohr and Alex Elena
        </p>
        <br/><br/>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'title')}>back</Inst> to return to title</p>
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
                   onReady={_.partial(this.onReady, i)}
                   onFailure={_.partial(this.onFailure, i)}
                   onComplete={this.onComplete}
                   onRescued={this.onRescued}
                   stillAlive={this.state.stillAlive}
                   startTime={this.state.startTime}
          />)}
      </div>
    );
  },

  render: function() {
    if (this.state.gameState === 'started') {
      return this.renderChefBoxes();
    }
    var titleText = this.state.singlePlayer ? 'Not Enough' : 'Too Many';
    var spacing = this.state.singlePlayer && <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>; // for centering the longer title
    var description = this.state.singlePlayer ? 'multitasking' : 'cooperative';
    var fadeClass = cx('fade-leave', {'fade-leave-active': this.state.fadeTitle});
    var fadeWithColor = cx('fade-leave', {
      'fade-leave-active': this.state.fadeTitle,
      'green': !this.state.singlePlayer,
      'darkBlue': this.state.singlePlayer,
    });

    return (
      <div className="center">
        <div className={cx('vcenter', {vtop: this.state.gameState !== 'title'})}>
          <img className="chefHat" src="images/chefhat.png" />
          <h1><span className={fadeClass}>{titleText}</span> Chefs{spacing}</h1>
          <h4>A text-based <span className={fadeWithColor}>{description}</span> cooking game</h4>
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
