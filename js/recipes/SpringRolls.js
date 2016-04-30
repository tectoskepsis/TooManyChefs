var React = require('react');

var Audio = require('../Audio.js');

var recipeData = {
  shrimpName: 'shrimpy',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var SpringRolls = {
  name: 'Spring Rolls',
  chefName: 'Entremetier',
  type: 'appetizer',
  difficulty: 'medium',
  ingredients: ['2 oz rice vermicelli', '8 rice wrappers', '8 large cooked shrimp', '3 tbsp cilantro', '2 lettuce leaves', '4 tsp fish sauce', '2 tbsp lime juice', '3 tbsp hoisin sauce', '1 tsp peanuts'],
  description: 'A refreshing summertime appetizer, delicious with sauce.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Type to',
      instruction: 'place',
      posttext: 'a medium saucepan filled with water on the stove.',
      timer: 10,
    },
    {
      pretext: <span>Use the arrow keys to turn the dial on the stove to <b className="fireRed">HIGH</b>.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 19 && value <= 24) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      onStart: () => Audio.playSE('boil', {loop: 3}),
      pretext: <span>Drop the <b>rice vermicelli</b> into the boiling water.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Pan',
      ingredients: [
        {name: 'rice vermicelli', key: 'r', left: true},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        Audio.stopSE('boil');
        if (recipeData.right.length === 1) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      onStart: () => Audio.playSE('sink'),
      pretext: 'Grab another bowl and',
      instruction: 'fill',
      posttext: 'it with water.',
      timer: 10,
      onComplete: function() {
        Audio.stopSE('sink');
        this.nextStep();
      },
    },
    {
      pretext: <span><b>Dip</b> a rice wrapper into the water for a few seconds, then <b>take it out</b>.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Bowl of Water',
      ingredients: [
        {name: 'wrapper', key: 'w', left: true},
      ],
      timer: 10,
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
    {
      pretext: 'Lay the wrapper',
      instruction: 'flat',
      posttext: 'on the table.',
      timer: 8,
    },
    {
      pretext: 'Take a shrimp and',
      instruction: 'peel',
      posttext: 'off its shell.',
      timer: 8,
    },
    {
      pretext: <span>Give a name to the shrimp you just undressed.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 6,
      onTimeout: function(name) {
        if (!name) {
          this.failure();
        } else {
          recipeData.shrimpName = name;
          this.nextStep();
        }
      },
    },
    {
      pretext: () => <span>Using the arrow keys, position {recipeData.shrimpName} in the <b>center</b> of the wrap.<br/></span>,
      instruction: () => recipeData.shrimpName.substring(0, 4),
      type: 'dial',
      maxValue: 20,
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=====WRAP=====</span>,
      timer: 10,
      onTimeout: function(value) {
        if (value >= 10 && value <= 14) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Scatter the vegetables onto the wrap by tapping 's'.<br/></span>,
      instruction: 's',
      type: 'mash',
      mashCount: 5,
      timer: 8,
    },
    {
      pretext: 'Take the rice vermicelli and',
      instruction: 'sprinkle',
      posttext: 'it onto the wrapper.',
      timer: 9,
    },
    {
      pretext: <span>Fold the sides of the wrap with the arrow keys.<br/></span>,
      instruction: 'lrrrlllr',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: 'Tightly',
      instruction: 'roll',
      posttext: 'the wrapper into a cylindrical shape.',
      timer: 8,
    },
    {
      pretext: <span>Karate chop the wrap into two smaller ones by mashing 'k'.<br/></span>,
      instruction: 'k',
      type: 'mash',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: 'Do a few push-ups while your heart is pumping.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: 'Now you\'re getting warmed up! Grab a bowl and',
      instruction: 'throw',
      posttext: 'in the fish sauce.',
      timer: 8,
    },
    {
      pretext: <span>Pour <b>2 tbsp</b> of lime juice into the bowl by holding 'l'.<br/></span>,
      instruction: 'llllllllllllllllllllllllllllllllllllllllime',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ 1.5 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 2 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 2.5 tbsp</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 16 && progress <= 22) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Add <b>garlic</b>, <b>sugar</b>, and <b>chili sauce</b> into the mix.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Bowl',
      ingredients: [
        {name: 'garlic', key: 'g', left: true},
        {name: 'sugar', key: 's', left: true},
        {name: 'chili sauce', key: 'c', left: true},
        {name: 'fish sauce', key: 'f', left: false},
        {name: 'lime juice', key: 'l', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 5) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Mix everything together by mashing 'm'.<br/></span>,
      instruction: 'm',
      type: 'mash',
      mashCount: 15,
      timer: 10,
    },
    {
      pretext: 'In another bowl,',
      instruction: 'g r i n d',
      posttext: 'up some peanuts.',
      timer: 7,
    },
    {
      pretext: 'Type',
      instruction: 'h',
      posttext: 'to add hoisin sauce to the bowl of peanuts.',
      timer: 7,
    },
    {
      pretext: <span>Move the <b>spring rolls</b> and <b>sauces</b> onto a plate.</span>,
      type: 'ingredients',
      leftName: 'Items',
      rightName: 'Plate',
      ingredients: [
        {name: 'spring rolls', key: 's', left: true},
        {name: 'peanut sauce', key: 'p', left: true},
        {name: 'fish sauce', key: 'f', left: true},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 3) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Finally,',
      instruction: 'deliver',
      posttext: 'the spring rolls to your drooling customers.',
      timer: 10,
    },
  ],
};

module.exports = SpringRolls;
