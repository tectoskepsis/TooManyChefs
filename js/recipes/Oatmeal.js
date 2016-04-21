var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

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
    // TODO: actual steps
    {
      pretext: 'Wait for the microwave to finish spinning.',
      timer: 100000, // TODO: used for testing, change to 10
      onTimeout: nextStep,
    },
  ],
};

module.exports = Oatmeal;
