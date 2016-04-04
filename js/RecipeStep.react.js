var React = require('react');
var _ = require('lodash');

var Arrows = require('./Arrows.react.js');
var Counter = require('./Counter.react.js');
var Dial = require('./Dial.react.js');
var Inst = require('./Instruction.react.js');
var Ingredients = require('./Ingredients.react.js');
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
                   React.PropTypes.number,
                   React.PropTypes.func,
                   React.PropTypes.element,
                 ]),
    type: React.PropTypes.oneOf(
      ['word', 'textinput', 'counter', 'dial', 'mash', 'arrows', 'ingredients']
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
      return _.isFunction(data) ? data() : data;
    }
    pretext = unravel(pretext);
    posttext = unravel(posttext);

    if (instruction || type === 'ingredients') {
      var instText = unravel(instruction);
      var Elem;

      switch (type) {
        case 'arrows':
          Elem = Arrows;
          break;

        case 'counter':
          Elem = Counter;
          break;

        case 'dial':
          Elem = Dial;
          break;

        case 'mash':
          Elem = Mash;
          break;

        case 'textinput':
          Elem = TextInput;
          break;

        case 'ingredients':
          Elem = Ingredients;
          break;

        default: // 'word'
          Elem = Inst;
          break;
      }
      instruction = <Elem {...props}>{instText}</Elem>;
    }

    return (
      <div>{pretext} {instruction} {posttext}</div>
    );
  },
});

module.exports = RecipeStep;
