var React = require('react');
var TransitionGroup = require('react-addons-css-transition-group');

var _ = require('lodash');
var cx = require('classnames');

var Inst = require('./Instruction.react.js');
var KeyboardMixin = require('./KeyboardMixin.react.js');
var Audio = require('./Audio.js');

var Volume = React.createClass({
  mixins: [KeyboardMixin],

  getInitialState: function() {
    return {
      volume: 80,
    };
  },

  onKeyDown: function(e) {
    var keyCode = e.which || e.keyCode || 0;
    var newVolume;
    if (keyCode === 37 && this.state.volume > 0) {
      // left arrow pressed
      newVolume = this.state.volume - 1;
      this.setState({volume: newVolume});
      Audio.setVolume(newVolume / 100);
      Audio.playRandomClick();
    } else if (keyCode === 39 && this.state.volume < 100) {
      // right arrow pressed
      newVolume = this.state.volume + 1;
      this.setState({volume: newVolume});
      Audio.setVolume(newVolume / 100);
      Audio.playRandomClick();
    }
  },

  render: function() {
    var volumeClass = this.state.volume === 0 ? 'off' :
                      this.state.volume <= 50 ? 'down' : 'up';
    var volume = <span className={'glyphicon glyphicon-volume-' + volumeClass} />

    return (
      <div>
        <span className="padRight10 glyphicon glyphicon-triangle-left" />
        {volume} <code><span className="input">{this.state.volume}</span></code>
        <span className="padLeft10 glyphicon glyphicon-triangle-right" />
        <br/>
        <p>Adjust the volume with the arrow keys.</p>
      </div>
    );
  },
});

module.exports = Volume;
