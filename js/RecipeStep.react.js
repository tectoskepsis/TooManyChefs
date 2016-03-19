var React = require('react');

var Inst = require('./Instruction.react.js');
var TextInput = require('./TextInput.react.js');

var RecipeStep = React.createClass({
  propTypes: {
    pretext: React.PropTypes.oneOfType([
               React.PropTypes.string,
               React.PropTypes.element,
               React.PropTypes.func,
             ]),
    posttext: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.element,
                React.PropTypes.func,
              ]),
    instruction: React.PropTypes.oneOfType([
                   React.PropTypes.string,
                   React.PropTypes.func,
                 ]),
    textinput: React.PropTypes.string,
    onComplete: React.PropTypes.func.isRequired,
  },

  render: function() {
    // Unravel closures in case they are functions
    var instText = (typeof this.props.instruction === 'function')
      ? this.props.instruction()
      : this.props.instruction;
    var pretext = (typeof this.props.pretext === 'function')
      ? this.props.pretext()
      : this.props.pretext;
    var posttext = (typeof this.props.posttext === 'function')
      ? this.props.posttext()
      : this.props.posttext;

    var instruction = this.props.instruction
      ? <Inst onComplete={this.props.onComplete}>{instText}</Inst>
      : null;

    var textinput = this.props.textinput
      ? <TextInput onComplete={this.props.onComplete}>{this.props.textinput}</TextInput>
      : null;

    return (
      <p>
        {pretext} {instruction}{textinput} {posttext}
      </p>
    );
  },
});

module.exports = RecipeStep;
