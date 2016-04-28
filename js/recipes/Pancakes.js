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
var Pancakes = {
  name: 'Pancakes',
  chefName: 'Fille de cuisine',
  type: 'entrée',
  difficulty: 'easy',
  ingredients: ['1 1/2 cups all-purpose flour', '3 1/2 tsp baking powder', '3 tbsp butter'],
  description: 'A basic plate of pancakes.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Wait a few seconds to gather your thoughts...',
      timer: 25,
      onTimeout: nextStep,
    },
    {
      pretext: 'Type',
      instruction: 'sift',
      posttext: 'to mix together flour, baking powder, salt, and sugar.',
      timer: 12,
    },
    {
    pretext: <span>Tap 'g' to grab a <b className="darkBlue">griddle</b> from the cabinet.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Cabinet',
      ingredients: [
        {name: 'griddle', key: 'g', left: false, sound: 'boop'},
        {name: 'wok', key: 'w', left: false, sound: 'boop'},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'griddle') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Tap up to start heating the griddle.<br/></span>,
      instruction: 'u',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <div>Hold 'b' to scoop the batter onto the griddle.<br/>(Stop at the <b>^</b> indicator for <b className="green">just right</b>!)<br/><br/></div>,
      instruction: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbatter',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ not enough&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 10,
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
      pretext: <span>Mash 'f' <b className="darkBlue">6 times</b> to flip the pancakes.<br/></span>,
      instruction: 'f',
      type: 'mash',
      mashCount: 6,
      timer: 10,
    },
    {
      pretext: <span>Press down to remove the pancakes and serve!<br/></span>,
      instruction: 'd',
      type: 'arrows',
      timer: 10,
    },
  ],
};

module.exports = Pancakes;
