var React = require('react');

var Audio = require('../Audio.js');

var recipeData = {
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var GreenBeanCasserole = {
  name: 'Green Bean Casserole',
  chefName: 'Entremetier',
  type: 'side',
  difficulty: 'easy',
  ingredients: ['1/3 stick butter', '1/2 cup onions', '1/2 cup mushrooms', '2 cups green beans', '1 can cream of mushroom soup', '1 cup cheddar cheese'],
  description: 'A classic vegetable side for the holidays, topped with crunchy onions.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Grab a cutting board and knife by tapping',
      instruction: 'g',
      posttext: '.',
      timer: 7,
    },
    {
      pretext: 'Type',
      instruction: 'knife',
      posttext: 'to equip the weapon.',
      timer: 12,
    },
    {
      pretext: <span>Mash 'd' to dice the onions and slice up the green beans.<br/></span>,
      instruction: 'd',
      type: 'mash',
      mashCount: 10,
      onPressSound: 'slice',
      timer: 10,
    },
    {
      pretext: <span>Using the arrow keys, preheat the oven to <b className="fireRed">350°F</b>.<br/></span>,
      instruction: 300,
      type: 'counter',
      goalValue: 350,
      timer: 10,
      onTimeout: function(value) {
        if (value >= 345 && value <= 355) {
          this.nextStep();
        } else {
          this.failure();
        }
      }
    },
    {
      pretext: <span>Add the <b>onions</b> and <b>mushrooms</b> into a large skillet.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Skillet',
      ingredients: [
        {name: 'onions', key: 'o', left: true},
        {name: 'mushrooms', key: 'm', left: true},
        {name: 'green beans', key: 'g', left: true},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'green beans') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Turn the stove to <b className="fireRed">MED</b> heat with the arrow keys.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 11 && value <= 15) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      onStart: () => Audio.playSE('frying', {loop: 3}),
      pretext: 'Saute the onions and mushrooms in butter with',
      instruction: 's',
      posttext: '.',
      timer: 10,
    },
    {
      pretext: <span>Add the <b>green beans</b> into the skillet.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Skillet',
      ingredients: [
        {name: 'onions', key: 'o', left: false},
        {name: 'mushrooms', key: 'm', left: false},
        {name: 'green beans', key: 'g', left: true},
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
      onStart: () => Audio.stopSE('frying'),
      pretext: <span>Pour in <b className="green">10 oz</b> of cream of mushroom soup by holding 's'.<br/><br/></span>,
      instruction: 'ssssssssssssssssssssssssssssssssssssssoup',
      posttext: <span><br/>oz:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 15</span>,
      timer: 10,
      onComplete: () => {},
      onHoldSound: 'pouring',
      onTimeout: function(progress) {
        if (progress >= 16 && progress <= 20) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Turn off the stove and remove the skillet.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 13,
      timer: 10,
      onTimeout: function(value) {
        if (value <= 3) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Grab a greased baking',
      instruction: 'dish',
      posttext: '.',
      timer: 10,
    },
    {
      pretext: 'Press',
      instruction: 'p',
      posttext: 'to pour the mixture into the baking dish.',
      timer: 8,
    },
    {
      pretext: <span>Put the <b>casserole</b> in the oven.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Oven',
      ingredients: [
        {name: 'casserole', key: 'c', left: true},
      ],
      timer: 8,
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
      pretext: 'Close your eyes and meditate as your beauty bakes.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Remove the casserole and top it by sprinkling some cheddar.<br/></span>,
      instruction: 's',
      type: 'mash',
      mashCount: 5,
      timer: 10,
    },
  ],
};

module.exports = GreenBeanCasserole;
