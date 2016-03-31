var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('timeout-transition-group');
var _ = require('lodash');

var ChefBox = require('./ChefBox.react.js');
var Inst = require('./Instruction.react.js');

var Recipes = require('./recipes/Recipes.js');

var Game = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      gameState: 'title',  // title | menu | started | loading
      numPlayers: 0,
      chefs: [],
      stillAlive: 0,
    };
  },

  onShowMenu: function() {
    this.setState({gameState: 'menu'});
  },

  onStartGame: function(numPlayers) {
    // Assign recipes randomly from entrees, appetizers, and desserts
    var chefs = new Array(numPlayers);
    var entrees = _.sampleSize(Recipes.Entrees, numPlayers > 4 ? 3 : 2);
    var chefNames = ['Chef de cuisine', 'Sous-chef', 'Assistant chef'];
    for (var i = 0; i < entrees.length; i++) {
      chefs[i] = entrees[i];
      chefs[i].chefName = chefNames[i];
    }

    var appetizers = _.sampleSize(Recipes.Appetizers, numPlayers > 5 ? 2 : 1);
    chefNames = ['Saucier', 'Tournant'];
    for (var i = 0; i < appetizers.length; i++) {
      chefs[entrees.length + i] = appetizers[i];
      chefs[entrees.length + i].chefName = chefNames[i];
    }

    chefs[numPlayers - 1] = _.sample(Recipes.Desserts);
    chefs[numPlayers - 1].chefName = 'Pâtissier';

    this.setState({gameState: ''});
    this.setTimeout(() => {
      this.setState({gameState: 'loading'});
    }, 500);

    // Wait a bit to fade out
    this.setTimeout(() => {
      this.setState({
        gameState: 'started',
        numPlayers: numPlayers,
        stillAlive: numPlayers,
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
    for (var i = 0; i < this.state.numPlayers; i++) {
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

  render: function() {
    if (this.state.gameState === 'started') {
      var widthClass = this.state.numPlayers > 4 ? 4 : 6;

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
                     widthClass={widthClass}
            />)}
        </div>
      );
    }

    var playerMenu = (
      <div>
        <p>Number of chefs:</p>
        <ul className="list-inline">
          <li><Inst onComplete={this.onStartGame.bind(this, 4)}>four</Inst></li>
          {/*<li><Inst onComplete={this.onStartGame.bind(this, 5)}>five</Inst></li>
          <li><Inst onComplete={this.onStartGame.bind(this, 6)}>six</Inst></li>*/}
        </ul>
      </div>
    );

    var loading = <div>Compiling recipes...</div>;

    return (
      <div className="center">
        <div className="vcenter">
          <h1>Too Many Chefs</h1>
          <h4>A text-based cooperative cooking game</h4>
        </div>

        <br/>
        <p>Type <Inst onComplete={this.onShowMenu}>start</Inst> to begin</p>
        <br/>
        <TransitionGroup enterTimeout={250}
                         leaveTimeout={250}
                         transitionName="fade">
          {this.state.gameState === 'menu' ? playerMenu :
           this.state.gameState === 'loading' ? loading : null}
        </TransitionGroup>
      </div>
    );
  },
});

module.exports = Game;
