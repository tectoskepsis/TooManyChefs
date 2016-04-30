var React = require('react');
var LocalStorageMixin = require('react-localstorage');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('react-addons-css-transition-group');

var _ = require('lodash');
var cx = require('classnames');

var Audio = require('./Audio.js');
var CapsLock = require('./CapsLock.react.js');
var ChefBox = require('./ChefBox.react.js');
var RecipeSelect = require('./RecipeSelect.react.js');
var Inst = require('./Instruction.react.js');
var LoadingQuote = require('./LoadingQuote.react.js');
var ModeSelect = require('./ModeSelect.react.js');
var Recipes = require('./recipes/Recipes.js');
var Volume = require('./Volume.react.js');


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
      singlePlayer: null,
      fadeTitle: false,
      gameOver: false,
      report: null,
      newRecord: 0,
      saveData: {},
    };
  },

  componentDidMount: function() {
    this.setTimeout(() => {
      if (this.state.saveData.volume !== undefined) {
        Audio.setVolume(this.state.saveData.volume / 100);
      }
      Audio.playBGM(); // play music
    }, 500); // HACK: wait half a second to read saved volume
  },

  setStateDelay: function(state, delay) {
    delay = delay || 500;

    var renderContent = _.noop;
    switch (state) {
      case 'title':
        renderContent = this.renderTitle;
        break;
      case 'help':
        Audio.playSE('help');
        renderContent = this.renderHelp;
        break;
      case 'menu':
        renderContent = this.renderRecipeMenu;
        break;
      case 'credits':
        Audio.playSE('staff');
        renderContent = this.renderCredits;
        break;
      case 'options':
        renderContent = this.renderOptions;
        break;
      case 'loading':
        this.setTimeout(() => Audio.playSE('loading'), delay);
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
    var meal = Recipes[this.state.meal];
    var chefs = this.state.singlePlayer
      ? _.get(meal, 'soloRecipes', meal.recipes)
      : meal.recipes;

    // Send Google Analytics event
    ga('send', 'event', 'Game', 'play', meal.name);

    // Wait a random amount of time before loading (8-10s)
    this.setTimeout(() => {
      this.setState({
        gameState: 'started',
        stillAlive: 0,
        completed: 0,
        gameOver: false,
        chefs: chefs.map(_.clone),
        report: null,
        newRecord: null,
      });
    }, 500 + _.random(7500, 9000));
  },

  onChooseMode: function(singlePlayer) {
    if (this.state.singlePlayer !== singlePlayer) {
      this.setState({fadeTitle: true});
      this.setTimeout(() => this.setState({
        singlePlayer: singlePlayer,
        fadeTitle: false,
      }), 350);

      if (singlePlayer) {
        document.title = 'Not Enough Chefs';
      } else {
        document.title = 'Too Many Chefs';
      }
    }

    if (this.state.gameState === 'title') {
      this.setTimeout(() => {
        this.setStateDelay('menu');
      }, 1500);
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
    if (stillAlive === this.state.chefs.length) {
      Audio.playSE(['ready', 'begin']);
      this.setState({startTime: new Date().getTime()});
      for (var i = 0; i < this.state.chefs.length; i++) {
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
    var chefs = this.state.chefs;
    chefs[loser].dead = true;
    this.setState({
      stillAlive: stillAlive,
      chefs: chefs,
    });

    // Propagate failure to everyone
    for (var i = 0; i < this.state.chefs.length; i++) {
      if (i === loser) {
        continue;
      }

      var chef = this.refs['chef' + i];
      var chefName = chefs[loser].chefName;

      if (!canSave) {
        chef.gameOver(<p>{chefName} failed to complete their recipe!</p>);
      } else if (!chefs[i].dead) {
        chef.showRescuePopup(chefName,
          () => this.refs['chef' + loser].rescue(loser));
      }
    }

    if (!canSave) {
      // Send Google Analytics event
      Audio.stopAllSounds();
      ga('send', 'event', 'Game', 'lose', Recipes[this.state.meal].name);
      Audio.playSE('failure');
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

  onComplete: function(winner, newRecord) {
    var completed = this.state.completed + 1;
    var chefs = this.state.chefs;
    chefs[winner].completed = true;
    this.setState({
      chefs: chefs,
      completed: completed,
      newRecord: newRecord,
    });

    if (completed === this.state.chefs.length) {
      // Send Google Analytics event
      Audio.stopAllSounds();
      ga('send', 'event', 'Game', 'win', Recipes[this.state.meal].name, newRecord);
      this.saveData(true, newRecord);
      return <p>Type <Inst onComplete={this.onReport}>report</Inst> to view your results.</p>;
    }
    return null;
  },

  onReport: function() {
    this.setState({report: this.renderReport()});
  },

  saveData: function(completed, newRecord) {
    // NOTE: for legacy reasons, the record is saved as "bestTime"
    // but it holds either times and counts
    var meal = Recipes[this.state.meal];
    var recordCmp = meal.record === 'count' ? Math.max : Math.min;
    var saveData = this.state.saveData;
    var mealData = _.get(saveData, meal.key, {});
    mealData.completed = completed;
    mealData.bestTime = _.has(mealData, 'bestTime')
      ? recordCmp(newRecord, mealData.bestTime) : newRecord;
    saveData[meal.key] = mealData;
    this.setState({saveData: saveData});
  },

  onRenderMode: function() {
    Audio.playSE('start');
    if (this.state.singlePlayer !== null) {
      this.setStateDelay('menu');
    } else {
      this.setState({content: null});
      this.setTimeout(() => this.setState({
        content: this.renderMode(),
      }), 500);
    }
  },

  onVolumeChange: function(vol) {
    var saveData = this.state.saveData;
    saveData.volume = vol;
    this.setState({saveData: saveData});
  },

  renderTitle: function() {
    return (
      <div key="title" className="padTop">
        <p>Type <Inst onComplete={this.onRenderMode}>start</Inst> to begin</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'help')}>help</Inst> for instructions</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'options')}>options</Inst> for restaurant settings</p>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'credits')}>credits</Inst> for culinary staff</p>
      </div>
    );
  },

  renderMode: function() {
    return (
      <ModeSelect key="mode"
                  onSolo={_.partial(this.onChooseMode, true)}
                  onParty={_.partial(this.onChooseMode, false)} />
    );
  },

  renderOptions: function() {
    return (
      <div key="options" className="padTop">
        <h4>Options</h4>
        <br/>
        {this.renderMode()}
        <br/>
        <p>Volume:</p>
        <Volume init={this.state.saveData.volume} onVolumeChange={this.onVolumeChange} />
        <br/>
        <p>Type <Inst onComplete={_.partial(this.setStateDelay, 'title')}>back</Inst> to return to title</p>
      </div>
    );
  },

  onRecipeProgress: function(val) {
    this.setState({meal: val});
  },

  renderRecipeMenu: function() {
    var meal = this.state.meal;
    return (
      <div key="recipe-menu">
        <RecipeSelect onProgress={this.onRecipeProgress}
                      onSelect={this.onStartGame}
                      saveData={this.state.saveData}
                      singlePlayer={this.state.singlePlayer}
                      startValue={meal}
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

        <p>You may need to <Inst reset onComplete={Audio.playGoodVoice}>type a command</Inst>,<br/> move a dial with the arrow keys, <br/> and more.</p>
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
    return <LoadingQuote key="loading" />;
  },

  renderCredits: function() {
    return (
      <div key="credits" className="padTop">
        <br/><br/>
        <h4>Credits</h4>
        <p>
          <b>Chef de cuisine</b>: Ivan Wang (design, programming)<br/>
          <b>Sous-chef</b>: James Wu (design)<br/>
          <b>Culinary consultant</b>: Anshu Bansal<br/>
          <b>Café jazz</b>: <i>Fortaleza</i> by Topher Mohr and Alex Elena
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
                   numChefs={this.state.chefs.length}
                   recipe={recipe}
                   onReady={_.partial(this.onReady, i)}
                   onFailure={_.partial(this.onFailure, i)}
                   onComplete={this.onComplete}
                   onRescued={this.onRescued}
                   onReport={this.onReport}
                   stillAlive={this.state.stillAlive}
                   startTime={this.state.startTime}
                   singlePlayer={this.state.singlePlayer}
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
    var won = this.state.completed === this.state.chefs.length;
    var newRecord = won && (meal.record === 'count'
      ? this.state.newRecord >= mealData.bestTime
      : this.state.newRecord <= mealData.bestTime);

    var completeText = won
      ? <b className="green">SUCCESS {newRecord && '- NEW RECORD'}</b>
      : <b className="fireRed">FAILURE</b>;
    var renderTime = function(time) {
      var min = (time / 60) << 0; // floor
      var sec = time % 60;
      return _.padStart(min, 2, '0') + ':' + _.padStart(sec, 2, '0');
    };
    var recordText = won && (meal.record === 'count'
      ? <p>Count: {this.state.newRecord}</p>
      : <p>Cook Time: {renderTime(this.state.newRecord)}</p>);

    if (newRecord) {
      Audio.playSE('newrecord');
    } else if (won) {
      Audio.playSE('success');
    }

    return (
      <div className="report center">
        <h3><b>{meal.name} - Review</b></h3>
        <h4>{completeText}</h4>
        {recordText}
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
          <CapsLock key="capslock" />
        </TransitionGroup>

        <div className="visible-xs-block alert alert-danger" role="alert">
          Sorry! This restaurant is incompatible with mobile devices. Please come back on a desktop web browser.
        </div>
      </div>
    );
  },
});

module.exports = Game;
