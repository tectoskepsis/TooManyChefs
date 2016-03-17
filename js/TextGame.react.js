var React = require('react');

//var Storybox = require('./Storybox.react.js');
//var StoryMixin = require('./StoryMixin.react.js');

var TextGame = React.createClass({
  //mixins: [StoryMixin],

  /*componentDidMount: function() {
    this.refs.storybox4.setActive(true);
    this.refs.storybox4.appendText(this.storyText(4, 'menu'));
  },*/

  render: function() {
    return (
      <div className="center">
        <div className="vcenter">
          <h1>Too Many Cooks</h1>
          <h4>A text-based cooperative cooking game</h4>
        </div>

        <br/>
        <p>Type <code>start</code> to begin</p>
      </div>
    );
  },
});

module.exports = TextGame;
