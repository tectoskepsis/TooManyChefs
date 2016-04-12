var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  left: [],
  right: [],
  frosting: 'cream cheese',
};

var nextStep = function() {
  return this.nextStep();
};

var ChocolateCupcakes = {
  name: 'Chocolate Cupcakes',
  chefName: 'Pâtissier',
  type: 'dessert',
  difficulty: 'easy',
  ingredients: ['1 1/3 cup all-purpose flour', '1/4 tsp baking soda', '2 tsp baking powder', '3/4 cup cocoa powder', '1/8 tsp salt', '2 eggs', '3/4 tsp vanilla extract', '1 cup milk'],
  description: 'Delicious mini-cakes frosted with love.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Type',
      instruction: '350',
      posttext: '°F to preheat the oven.',
      timer: 10,
    },
    {
      pretext: <span>Grab a <b>muffin pan</b> from the pantry.</span>,
      type: 'ingredients',
      leftName: 'Selection',
      rightName: 'Pantry',
      ingredients: [
        {name: 'pot', key: 'p', left: false, sound: 'boop'},
        {name: 'wok', key: 'w', left: false, sound: 'boop'},
        {name: 'muffin pan', key: 'm', left: false, sound: 'boop'},
        {name: 'saucepan', key: 's', left: false, sound: 'boop'},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'muffin pan') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Hold 'f' to pour <b className="green">1 1/3 cups</b> of flour.<br/><br/></span>,
      instruction: 'ffffffffffffffffffffffffffffffffffflour',
      posttext: <span><br/>cups:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 2/3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 3/3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 4/3</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 30 && progress <= 34) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Press',
      instruction: 'm',
      posttext: 'to measure out baking soda, baking powder, and cocoa powder.',
      timer: 8,
    },
    {
      pretext: <span>Cream together butter and sugar in a bowl by tapping 'c'.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 8,
      timer: 10,
    },
    {
      pretext: 'Crack two',
      instruction: 'eggs',
      posttext: 'into the bowl.',
      timer: 10,
    },
    {
      pretext: <span>Beat the mixture by mashing 'b'.<br/></span>,
      instruction: 'b',
      type: 'mash',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: <span>Stir the mixture with the arrow keys.<br/></span>,
      instruction: 'ldruldru',
      type: 'arrows',
      timer: 12,
    },
    {
      pretext: <span>Alternating, pour in the flour mixture and milk.<br/></span>,
      instruction: 'fmfmfmfmfm',
      timer: 10,
    },
    {
      pretext: 'Fill the muffin cups with',
      instruction: 'y',
      posttext: '.',
      timer: 6,
    },
    {
      pretext: <span>Put the <b>muffin pan</b> in the oven.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Oven',
      ingredients: [
        {name: 'muffin pan', key: 'm', left: true, sound: 'boop'},
      ],
      timer: 7,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 1) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Lend a helping hand to the Saucier while your cupcakes bake.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: 'Remove the cupcakes from the oven with',
      instruction: 'r',
      posttext: '.',
      timer: 7,
    },
    {
      pretext: <span>Choose your <b>favorite</b> frosting (but <b>just one</b>)!</span>,
      type: 'ingredients',
      leftName: 'Selection',
      rightName: 'Frosting',
      ingredients: [
        {name: 'cream cheese', key: 'c', left: false},
        {name: 'buttercream', key: 'b', left: false},
        {name: 'vanilla', key: 'v', left: false},
        {name: 'whipped cream', key: 'w', left: false},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1) {
          recipeData.frosting = recipeData.left[0].name;
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: () => <span>Frost the cupcakes with {recipeData.frosting} by typing</span>,
      instruction: 'swirl',
      posttext: '.',
      timer: 10,
    },
  ],
};

module.exports = ChocolateCupcakes;
