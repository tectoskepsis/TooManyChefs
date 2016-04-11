var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  name: 'mahi',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
}

var FruitCeviche = {
  name: 'Fruit Ceviche',
  chefName: 'Garde Manger',
  type: 'appetizer',
  difficulty: 'easy',
  ingredients: ['1 lb mahi-mahi fish fillet', '1/2 cup fresh lime juice', '1/2 cup fresh orange juice', '1 red onion', '2 cups mango', '1/2 pineapple', '3 avocados', '4 sprigs coriander'],
  description: 'A refreshing tropical starter, both fruity and savory.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Grab a <b>cutting board</b> and <b>knife</b> and place them on the table.</span>,
      type: 'ingredients',
      leftName: 'Items',
      rightName: 'Table',
      ingredients: [
        {name: 'cutting board', key: 'c', left: true},
        {name: 'knife', key: 'k', left: true},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 2) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Nickname your friend, the mahi-mahi.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 8,
      onTimeout: function(name) {
        if (!name) {
          this.failure();
        } else {
          recipeData.name = name;
          this.nextStep();
        }
      },
    },
    {
      pretext: () => <span>Cut {recipeData.name} into little cubes by tapping 'c'.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: <span>Slice and dice the mango, onions, and coriander by typing 'sd'.<br/></span>,
      instruction: 'sdsdsdsdsdsd',
      timer: 10,
    },
    {
      pretext: <span>Line up the knife with the arrow keys to cut the avocado in <b>half</b>.<br/></span>,
      instruction: 'v',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AVOCADO</span>,
      type: 'dial',
      onTimeout: function(value) {
        if (value >= 9 && value <= 11) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
      timer: 9,
    },
    {
      pretext: 'Cut the pineapple into',
      instruction: 'circular',
      posttext: 'slices.',
      timer: 10,
    },
    {
      pretext: 'Put your friend',
      instruction: () => recipeData.name,
      posttext: 'into a large bowl.',
      timer: 12,
    },
    {
      pretext: () => <span>Bathe {recipeData.name} in <b>1 cup</b> of citrus juices by holding 'j'.<br/></span>,
      instruction: 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjuice',
      posttext: <span><br/>cups:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 1/4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 3/4&nbsp;&nbsp;&nbsp;&nbsp;^ 5/4</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 26 && progress <= 30) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: () => <span>Hum to yourself as {recipeData.name} floats in the juicy bath.</span>,
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Count to 5 while the fish continues to soak.<br/></span>,
      instruction: '1 2 3 4 5',
      timer: 10,
    },
    {
      pretext: 'Type',
      instruction: 'drain',
      posttext: 'to pour out most of the juice.',
      timer: 8,
    },
    {
      pretext: <span>Add the <b>diced mango</b>, <b>pineapple</b>, and <b>red onion</b> to the bowl.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Bowl',
      ingredients: [
        {name: 'mango', key: 'm', left: true},
        {name: 'pineapple', key: 'p', left: true},
        {name: 'red onion', key: 'r', left: true},
        {name: 'fish', key: 'f', left: false},
      ],
      timer: 9,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 4) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Stir the mixture lightly with the arrow keys.<br/></span>,
      instruction: 'urdlurdl',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span><b>De-pit</b> the remaining avocados and scoop in the <b>fruit filling</b>.</span>,
      type: 'ingredients',
      leftName: 'Bowl',
      rightName: 'Avocado',
      ingredients: [
        {name: 'filling', key: 'f', left: true},
        {name: 'pit', key: 'p', left: false},
      ],
      timer: 9,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 1 && recipeData.right[0] === 'filling') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Sprinkle some coriander to finish the dish with 's'.<br/></span>,
      instruction: 's',
      type: 'mash',
      mashCount: 4,
      timer: 8,
    },
    {
      pretext: 'Grab a plate and',
      instruction: 'decorate',
      posttext: 'it with the avocados.',
      timer: 10,
    },
    {
      pretext: 'Sit back and admire your handiwork.',
      timer: 8,
      onTimeout: nextStep,
    },
  ],
};

module.exports = FruitCeviche;
