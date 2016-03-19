var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

var FriedRice = {
  name: 'Chicken Fried Rice',
  difficulty: 'medium',
  ingredients: ['1 onion', '2 cups steamed rice', '2 eggs', '2 tbsp vegetable oil', '8 oz chicken breast', '1/2 cup carrots', 'soy sauce to taste'],
  description: 'A tasty balanced meal, perfect for getting rid of leftover rice.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Grab a ',
      instruction: 'cutting board',
      posttext: ' from the kitchen cabinet.',
      timer: 15,
    },
    {
      pretext: 'Equip a ',
      instruction: 'knife',
      posttext: ' for +3 ATK vs vegetables.',
      timer: 15,
    },
  ]
};

module.exports = FriedRice;
