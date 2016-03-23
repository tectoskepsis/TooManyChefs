var React = require('react');
var TimerMixin = require('react-timer-mixin');
var TransitionGroup = require('timeout-transition-group');

var ChefBox = require('./ChefBox.react.js');
var Inst = require('./Instruction.react.js');

/* Recipes */
var recipes = [
  require('./recipes/FriedRice.js'),
  require('./recipes/Cheesecake.js'),
  require('./recipes/CrabCakes.js'),
  require('./recipes/BeefStroganoff.js'),
];

var Game = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      gameState: 'title',  // title | menu | started | loading
      numPlayers: 0,
      chefs: [],
    };
  },

  onShowMenu: function() {
    this.setState({gameState: 'menu'});
  },

  onStartGame: function(numPlayers) {
    var chefs = new Array(numPlayers);
    for (var i = 0; i < numPlayers; i++) {
      // TODO: give each chef a distinct random recipe
      chefs[i] = recipes[i % 4];
    }

    this.setState({gameState: ''});
    this.setTimeout(() => {
      this.setState({gameState: 'loading'});
    }, 500);

    // Wait a bit to fade out
    this.setTimeout(() => {
      this.setState({
        gameState: 'started',
        numPlayers: numPlayers,
        chefs: chefs,
      });
    }, 3000);
  },

  render: function() {
    if (this.state.gameState === 'started') {
      var widthClass = this.state.numPlayers > 4 ? 4 : 6;

      return (
        <div>
          {this.state.chefs.map((recipe, i) =>
            <ChefBox key={i} chefId={i}
                     recipe={recipe}
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
