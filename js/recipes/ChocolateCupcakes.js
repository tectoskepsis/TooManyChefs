var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

var nextStep = function() {
  return this.nextStep();
}

var ChocolateCupcakes = {
  name: 'Chocolate Cupcakes',
  chefName: 'Pâtissier',
  type: 'dessert',
  difficulty: 'easy',
  ingredients: ['1 1/3 cup all-purpose flour', '1/4 tsp baking soda', '2 tsp baking powder', '3/4 cup unsweetened cocoa powder', '1/8 tsp salt', '2 eggs', '3/4 tsp vanilla extract', '1 cup milk'],
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
      // TODO: ingredient select mechanic
      pretext: 'Grab a muffin pan from the pantry.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Hold 'f' to pour 1 1/3 cups of flour.<br/></span>,
      instruction: 'ffffffffffffffffffffffffffffffffffflour',
      posttext: <span><br/>cups:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 2/3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 3/3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 4/3</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 21 && progress <= 25) {
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
      // TODO: ingredient select mechanic
      pretext: 'Put the muffin pan in the oven.',
      timer: 10,
      onTimeout: nextStep,
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
      // TODO: ingredient select mechanic
      pretext: 'Choose your favorite frosting.',
      timer: 8,
      onTimeout: nextStep,
    },
    {
      pretext: 'Frost the cupcakes by typing',
      instruction: 'swirl',
      posttext: '.',
      timer: 10,
    },
  ],
};

module.exports = ChocolateCupcakes;
