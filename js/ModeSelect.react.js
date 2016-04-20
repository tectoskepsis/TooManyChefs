var React = require('react');

var Audio = require('./Audio.js');
var Inst = require('./Instruction.react.js');

var ModeSelect = React.createClass({
  propTypes: {
    onSolo: React.PropTypes.func.isRequired,
    onParty: React.PropTypes.func.isRequired,
  },

  onSolo: function() {
    Audio.playSE('solo');
    this.props.onSolo();
  },

  onParty: function() {
    Audio.playSE('party');
    this.props.onParty();
  },

  render: function() {
    return (
      <div className="padTop">
        <p>Select mode:</p>
        <p><Inst reset onComplete={this.onSolo}>solo</Inst> (single-player)</p>
        <p><Inst reset onComplete={this.onParty}>party</Inst> (2-4 players)</p>
      </div>
    );
  },
});

module.exports = ModeSelect;
