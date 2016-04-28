var React = require('react');

var recipeData = {
  name: 'Eggy',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

/* Used for tutorial */
var ScrambledEggs = {
  name: 'Scrambled Eggs',
  chefName: 'Apprenti',
  type: 'entrée',
  difficulty: 'easy',
  ingredients: ['2 eggs', 'vegetable oil', 'salt'],
  description: 'A basic plate of scrambled eggs.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Wait a few seconds to gather your thoughts...',
      timer: 20,
      onTimeout: nextStep,
    },
    {
      pretext: 'Type',
      instruction: 'crack',
      posttext: 'to crack some eggs into a bowl.',
      timer: 10,
      onComplete: function() {
        this.nextStep(false, 'eggcrack');
      },
    },
    {
      pretext: <span>Mash 'b' <b className="darkBlue">8 times</b> to beat the eggs.<br/></span>,
      instruction: 'b',
      type: 'mash',
      mashCount: 8,
      onPressSound: ['eggbeat1', 'eggbeat2'],
      timer: 10,
    },
    {
      pretext: <div>Hold 'o' to pour some oil into a pan.<br/>(Stop at the <b>^</b> indicator for <b className="green">just right</b>!)<br/><br/></div>,
      instruction: 'ooooooooooooooooooooooooooooooooooooooooooooooooooooil',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ not enough&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 20 && progress <= 30) {
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
      pretext: <span>Type a nickname for your eggy breakfast while it cooks.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 7,
      onTimeout: function(name) {
        if (!name) {
          this.failure();
        } else {
          recipeData.name = name.substr(0, 15); // max 15 letters
          this.nextStep();
        }
      },
    },
    {
      pretext: () => <span>Use the arrow keys to <b className="green">scramble</b> {recipeData.name}.<br/></span>,
      instruction: 'urururur',
      type: 'arrows',
      timer: 10,
    },
    {
    pretext: <span>Tap 's' to move the <b className="darkBlue">scrambled eggs</b> onto a plate.</span>,
      type: 'ingredients',
      leftName: 'Plate',
      rightName: 'Pan',
      ingredients: [
        {name: 'scrambled eggs', key: 's', left: false},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
  ],
};

module.exports = ScrambledEggs;
