var React = require('react');

var recipeData = {
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

/* Used for tutorial or testing */
var Oatmeal = {
  name: 'Oatmeal',
  chefName: 'Garçon de cuisine',
  type: 'entrée',
  difficulty: 'easy',
  ingredients: ['oatmeal', 'desperation', 'creativity'],
  description: 'A basic meal of oats.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Type',
      instruction: 'rip',
      posttext: 'to open a bag of oatmeal.',
      timer: 10,
    },
    {
      pretext: <span>Tap 'p' to take out a <b>pot</b> from the cabinet.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Cabinet',
      ingredients: [
        {name: 'pot', key: 'p', left: false, sound: 'boop'},
        {name: 'not a pot', key: 'n', left: false, sound: 'boop'},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'pot') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <div>Hold 'w' to pour <b className="green">1 cup</b> of water into the bowl.<br/>(Stop at the correct <b>^</b> indicator!)<br/><br/></div>,
      instruction: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwater',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 1/2 cup&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 1 cup&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 3/2 cups</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 21 && progress <= 28) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Use the arrow keys (left, right) to turn the dial on the stove to <b className="fireRed">MED</b>.<br/><br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 10 && value <= 16) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Mash 'o' <b className="darkBlue">5 times</b> to pour the oats into the bowl.<br/></span>,
      instruction: 'o',
      type: 'mash',
      mashCount: 5,
      timer: 10,
    },
    {
      pretext: <span>Stir the oatmeal with the arrow keys.<br/></span>,
      instruction: 'urdlurdl',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Type a creative name for your brilliant breakfast.<br/></span>,
      instruction: 'Name the oatmeal: ',
      type: 'textinput',
      timer: 7,
      onTimeout: nextStep,
    },
  ],
};

module.exports = Oatmeal;
