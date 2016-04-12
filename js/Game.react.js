var React = require('react');
var LocalStorageMixin = require('react-localstorage');
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
var Volume = require('./Volume.react.js');


const LOADING_QUOTES = [
  {quote: <span>A good chef doesn't <span className="darkBlue">use</span> ingredients.<br/>A good chef <span className="green">eats</span> them.</span>, source: 'unknown'},
  {quote: <span><span className="fireRed">Well done</span> is better than well said, except for steaks, which should always be<br/><span className="fireRed">medium-rare</span>.</span>, source: 'Benjamin Franklin'},
  {quote: <span>A kitchen <span className="fireRed">divided</span> against itself<br/>cannot stand.</span>, source: 'Abraham Lincoln'},
  {quote: <span>Human behavior flows from three main sources: desire, emotion, and <span className="goldenBrown">cooking</span>.</span>, source: 'Plato'},
  {quote: <span>At his best, man is the noblest of all animals; <span className="fireRed">separated from cuisine</span> he is the worst.</span>, source: 'Aristotle'},
  {quote: <span>One chef, two chef.<br/><span className="fireRed">Red chef</span>, <span className="darkBlue">blue chef</span>.</span>, source: 'Dr. Seuss'},
  {quote: <span>To improve is <span className="darkBlue">to cook</span>; to be perfect is <span className="green">to cook often</span>.</span>, source: 'Winston Churchill'},
  {quote: <span><span className="green">To cook</span> or <span className="darkBlue">not to cook</span>, that is the question.</span>, source: 'Hamlet, William Shakespeare'},
  {quote: <span><span className="goldenBrown">Perfect steak</span>, like perfect men,<br/>are <span className="fireRed">very rare</span>.</span>, source: 'Rene Descartes'},
  {quote: <span>I cannot believe in a God who wants<br/> to be <span className="fireRed">fed all the time</span>.</span>, source: 'Friedrich Nietzsche'},
  {quote: <span><span className="goldenBrown">Cuisine</span> is the mediator between the spiritual and the sensual life.</span>, source: 'Ludwig van Beethoven'},
  {quote: <span>I pay no attention whatever to anybody's praise or blame. <span className="green">I simply follow my own recipe.</span></span>, source: 'Wolfgang Amadeus Mozart'},
  {quote: <span>There is no substitute for <span className="fireRed">good spices</span>.</span>, source: 'Thomas Edison'},
  {quote: <span>Associate with chefs of good quality if you esteem your own reputation; for it is better to <span className="darkBlue">be alone</span> than in <span className="fireRed">bad company</span>.</span>, source: 'George Washington'},
  {quote: <span>It's the recipe that's <span className="fireRed">never started</span> as takes <span className="green">longest to finish</span>.</span>, source: 'J. R. R. Tolkien'},
  {quote: <span><span className="darkBlue">You</span> must be the <span className="green">change</span> you wish<br/>to see in the kitchen.</span>, source: 'Mahatma Gandhi'},
  {quote: <span><span className="darkBlue">All my life</span> I've looked at ingredients as though I were seeing them for the first time.</span>, source: 'Ernest Hemingway'},
  {quote: <span><span className="darkBlue">Good chefs</span> copy;<br/><span className="green">great chefs</span> steal.</span>, source: 'Pablo Picasso'},
  {quote: <span>Be less curious about <span className="green">people</span><br/>and more curious about <span className="goldenBrown">food</span>.</span>, source: 'Marie Curie'},
  {quote: <span>Do not tell <span className="green">secret recipes</span> to those whose faith and silence you have not already tested.</span>, source: 'Queen Elizabeth I'},
  {quote: <span>A <span className="darkBlue">single grain of rice</span> can tip the scale.</span>, source: 'The Emperor of China, Mulan'},
  {quote: <span><span className="darkBlue">The truth.</span> It is a beautiful and terrible thing, and should therefore be treated with great caution.</span>, source: 'Albus Dumbledore, J. K. Rowling'},
];

var Game = React.createClass({
  mixins: [LocalStorageMixin, PureRenderMixin, TimerMixin],

  getLocalStorageKey: function() {
    return 'toomanychefs';
  },

  getStateFilterKeys: function() {
    return ['saveData'];
  },

  getInitialState: function() {
    return {
      gameState: 'title',  // title | help | menu | started | options | loading
      chefs: [],
      stillAlive: 0,
      completed: 0,
      meal: 0,
      content: this.renderTitle(),
      startTime: 0,
      singlePlayer: false,
      fadeTitle: false,
      gameOver: false,
      report: null,
      mealTime: 0,
      saveData: {},
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
      case 'options':
        renderContent = this.renderOptions;
        break;
      case 'loading':
        renderContent = this.renderLoading;
        break;
    }

    this.setState({
      gameState: '',
      content: null,
      report: null,
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

    // Wait a random amount of time before loading (9-11s)
    this.setTimeout(() => {
      this.setState({
        gameState: 'started',
        stillAlive: 0,
        completed: 0,
        gameOver: false,
        chefs: Recipes[this.state.meal].recipes.map(_.clone),
        report: null,
        mealTime: null,
      });
    }, 500 + _.random(9000, 11000));
  },

  onChooseMode: function(singlePlayer) {
    if (this.state.singlePlayer !== singlePlayer) {
      this.setState({fadeTitle: true});
      this.setTimeout(() => this.setState({
        singlePlayer: singlePlayer,
        fadeTitle: false,
      }), 350);
    }
  },

  onReady: function(player) {
    var stillAlive = this.state.stillAlive + 1;
    var chefs = this.state.chefs;
    this.setState({
      chefs: chefs,
      stillAlive: stillAlive,
    });

    // Are all chefs ready to begin?
    if (stillAlive === 4) {
      this.setState({startTime: new Date().getTime()});
      for (var i = 0; i < 4; i++) {
        var chef = this.refs['chef' + i];
        chef.startGame();
      }
      return true;
    }
    return false;
  },

  onFailure: function(loser, canSave) {
    if (this.state.gameOver) {
      return;
    }

    var stillAlive = this.state.stillAlive - 1;
    var gameOver = !canSave || stillAlive === this.state.completed;

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

      if (gameOver) {
        chef.gameOver(<p>{chefName} failed to complete their recipe!</p>);
      } else if (!chefs[i].dead) {
        chef.showRescuePopup(chefName,
          () => this.refs['chef' + loser].rescue(loser));
      }
    }

    if (gameOver) {
      // Send Google Analytics event
      ga('send', 'event', 'Game', 'lose', Recipes[this.state.meal].name);
      this.setState({gameOver: true});
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
    var completed = this.state.completed + 1;
    var chefs = this.state.chefs;
    var newTime = ((new Date().getTime() - this.state.startTime) / 1000) << 0;
    chefs[winner].completed = true;
    this.setState({
      chefs: chefs,
      completed: completed,
      mealTime: newTime,
    });

    if (completed === 4) {
      // Send Google Analytics event
      ga('send', 'event', 'Game', 'win', Recipes[this.state.meal].name, newTime);
      this.saveData(true, newTime);
      return <p>Type <Inst onComplete={this.onReport}>report</Inst> to view your results.</p>;
    }
    return null;
  },

  onReport: function() {
    this.setState({report: this.renderReport()});
  },

  saveData: function(completed, newTime) {
    var meal = Recipes[this.state.meal];
    var saveData = this.state.saveData;
    var mealData = _.get(saveData, meal.key, {});
    mealData.completed = completed;
    mealData.bestTime = _.has(mealData, 'bestTime')
      ? Math.min(newTime, mealData.bestTime) : newTime;
    saveData[meal.key] = mealData;
    this.setState({saveData: saveData});
  },

  renderTitle: function() {
    return (
      <div className="padTop">
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'menu')}>start</Inst> to begin</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'help')}>help</Inst> for instructions</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'options')}>options</Inst> for restaurant settings</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'credits')}>credits</Inst> for culinary staff</p>
      </div>
    );
  },

  renderOptions: function() {
    return (
      <div className="padTop">
        <h4>Options</h4>
        <br/>
        <p>Select mode:</p>
        <p><Inst reset onComplete={_.partial(this.onChooseMode, true)}>solo</Inst> (single-player)</p>
        <p><Inst reset onComplete={_.partial(this.onChooseMode, false)}>party</Inst> (2-4 players)</p>
        <br/>
        <p>Volume:</p>
        <Volume />
        <br/>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'title')}>back</Inst> to return to title</p>
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
                      onSelect={this.onStartGame}
                      saveData={this.state.saveData}
                      />
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

        <p>You may need to <Inst reset onComplete={_.noop}>type a command</Inst>,<br/> move a dial with the arrow keys, <br/> and more.</p>
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
    var quote = _.sample(LOADING_QUOTES);
    return (
      <div className="padTop vcenter vtop">
        <h3>Loading...</h3>
        <blockquote className="padTop">
          <p>{quote.quote}</p>
          <footer>{quote.source}</footer>
        </blockquote>
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
                   onReport={this.onReport}
                   stillAlive={this.state.stillAlive}
                   startTime={this.state.startTime}
          />)}
        <TransitionGroup transitionName="fade"
                         transitionEnterTimeout={250}
                         transitionLeaveTimeout={250}>
          {this.state.report}
        </TransitionGroup>
      </div>
    );
  },

  renderReport: function() {
    var meal = Recipes[this.state.meal];
    var mealData = _.get(this.state.saveData, meal.key);
    var won = this.state.completed === 4;
    var newRecord = won && this.state.mealTime <= mealData.bestTime;
    var completeText = won
      ? <b className="green">SUCCESS {newRecord && '- NEW RECORD'}</b>
      : <b className="fireRed">FAILURE</b>;
    var renderTime = function(time) {
      var min = (time / 60) << 0; // floor
      var sec = time % 60;
      return _.padStart(min, 2, '0') + ':' + _.padStart(sec, 2, '0');
    };

    return (
      <div className="report center">
        <h3><b>{meal.name} - Review</b></h3>
        <h4>{completeText}</h4>
        {won && <p>Cook Time: {renderTime(this.state.mealTime)}</p>}
        {this.state.chefs.map((r, i) =>
          <div key={i} className={cx({green: r.completed, fireRed: !r.completed})}>{r.name}</div>)}
        <br/>
        <p>Type <Inst onComplete={this.onStartGame}>replay</Inst> to restart the meal.</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'menu')}>back</Inst> to return to the menu.</p>
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
