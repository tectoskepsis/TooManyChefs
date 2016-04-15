var React = require('react');

var Inst = require('./Instruction.react.js');

var ModeSelect = React.createClass({
  propTypes: {
    onSolo: React.PropTypes.func.isRequired,
    onParty: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <div className="padTop">
        <p>Select mode:</p>
        <p><Inst reset onComplete={this.props.onSolo}>solo</Inst> (single-player)</p>
        <p><Inst reset onComplete={this.props.onParty}>party</Inst> (2-4 players)</p>
      </div>
    );
  },
});

module.exports = ModeSelect;
