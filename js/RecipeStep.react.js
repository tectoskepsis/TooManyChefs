var React = require('react');

var Inst = require('./Instruction.react.js');

var RecipeStep = React.createClass({
  propTypes: {
    pretext: React.PropTypes.string,
    instruction: React.PropTypes.string.isRequired,
    posttext: React.PropTypes.string,
    onComplete: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <p>
        {this.props.pretext}
        <Inst onComplete={this.props.onComplete}>{this.props.instruction}</Inst>
        {this.props.posttext}
      </p>
    );
  },
});

module.exports = RecipeStep;
