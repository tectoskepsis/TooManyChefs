var React = require('react');

var Dial = require('./Dial.react.js');
var Inst = require('./Instruction.react.js');
var Mash = require('./Mash.react.js');
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
    type: React.PropTypes.oneOf(
      ['word', 'textinput', 'dial', 'mash']
    ),
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      type: 'word',
    };
  },

  render: function() {
    var {pretext, instruction, posttext, type, ...props} = this.props;

    // Unravel closures in case they are functions
    function unravel(data) {
      return (typeof data === 'function') ? data() : data;
    }
    pretext = unravel(pretext);
    posttext = unravel(posttext);

    if (instruction) {
      var instText = unravel(instruction);
      var Elem = Inst;
      switch (type) {
        case 'word':
          Elem = Inst;
          break;

        case 'textinput':
          Elem = TextInput;
          break;

        case 'dial':
          Elem = Dial;
          break;

        case 'mash':
          Elem = Mash;
          break;
      }
      instruction = <Elem {...props}>{instText}</Elem>;
    }

    return (
      <p>{pretext} {instruction} {posttext}</p>
    );
  },
});

module.exports = RecipeStep;
