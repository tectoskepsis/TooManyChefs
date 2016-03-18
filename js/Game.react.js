var React = require('react');

var Inst = require('./Instruction.react.js');

var Game = React.createClass({
  //mixins: [StoryMixin],

  /*componentDidMount: function() {
    this.refs.storybox4.setActive(true);
    this.refs.storybox4.appendText(this.storyText(4, 'menu'));
  },*/

  onStartGame: function() {
    console.log("whee");
  },

  render: function() {
    return (
      <div className="center">
        <div className="vcenter">
          <h1>Too Many Cooks</h1>
          <h4>A text-based cooperative cooking game</h4>
        </div>

        <br/>
        <p>Type <Inst text="start" onComplete={this.onStartGame}/> to begin</p>
      </div>
    );
  },
});

module.exports = Game;
