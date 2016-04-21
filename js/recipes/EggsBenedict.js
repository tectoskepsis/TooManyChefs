var React = require('react');

var Audio = require('../Audio.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var EggsBenedict = {
  name: 'Eggs Benedict',
  chefName: 'Entremetier',
  type: 'entrée',
  difficulty: 'medium',
  ingredients: ['2 egg yolks', '2 tsp lemon juice', '1/4 tsp salt', '1/2 cup unsalted butter', '2 English muffins', '4 eggs', '2/3 cup fresh arugula'],
  description: 'Poached eggs and rich hollandaise blend into this fabulous brunch special.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Add <b>egg yolks</b>, <b>lemon juice</b>, and <b>salt</b> into a blender.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Blender',
      ingredients: [
        {name: 'egg yolks', key: 'e', left: true},
        {name: 'lemon juice', key: 'l', left: true},
        {name: 'salt', key: 's', left: true},
        {name: 'butter', key: 'b', left: true},
      ],
      timer: 12,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'butter') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Add butter into a saucepan by tapping',
      instruction: 'b',
      posttext: '.',
      timer: 10,
    },
    {
      pretext: <span>Learn some vocabulary while the butter melts.<br/>Butyraceous (<i>adj</i>). of or like butter.</span>,
      timer: 10,
      onTimeout: function() {
        this.nextStep(false, 'butyraceous');
      },
    },
    {
      pretext: <span>Plug in the blender using the arrow keys.<br/><br/>|OUTLET|</span>,
      instruction: '<=plug=',
      type: 'dial',
      startValue: 10,
      onTimeout: function(value) {
        if (value <= 2) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
      timer: 10,
    },
    {
      pretext: <span>Pour the melted <b>butter</b> into the blender.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Blender',
      ingredients: [
        {name: 'egg yolks', key: 'e', left: false},
        {name: 'lemon juice', key: 'l', left: false},
        {name: 'salt', key: 's', left: false},
        {name: 'butter', key: 'b', left: true},
      ],
      timer: 10,
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
      pretext: <span>Press <b>up</b> to turn on the blender.<br/></span>,
      instruction: 'u',
      type: 'arrows',
      timer: 8,
      onComplete: function() {
        Audio.playSE('blender', {loop: 3});
        this.nextStep();
      },
    },
    {
      pretext: <span>To speed up, shake the blender by mashing 's'.<br/></span>,
      instruction: 's',
      type: 'mash',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: <span>Turn off the blender by pressing <b>down</b>, finishing the hollandaise.<br/></span>,
      instruction: 'd',
      type: 'arrows',
      timer: 8,
      onComplete: function() {
        Audio.stopSE('blender');
        this.nextStep();
      },
    },
    {
      pretext: <span>Well done! Brag to the Pâtissier by using <b>butyraceous</b> in a sentence.<br/></span>,
      instruction: 'The butyraceous ',
      type: 'textinput',
      timer: 10,
      onTimeout: function(sentence) {
        if (!sentence) {
          this.failure();
        } else {
          this.nextStep();
        }
      },
    },
    {
      pretext: <span>Onto the eggs. Crack 4 eggs by tapping 'c'.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 4,
      onPressSound: 'eggcrack',
      timer: 10,
    },
    {
      pretext: 'Fill a pot with',
      instruction: 'water',
      posttext: '.',
      timer: 10,
    },
    {
      pretext: <span>Use the arrow keys to turn the dial on the stove to <b className="fireRed">MED</b>.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
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
      pretext: 'Add a',
      instruction: 'dash',
      posttext: 'of vinegar to the simmering pot.',
      timer: 10,
    },
    {
      pretext: <span>Create a whirlpool in the water with the arrow keys.<br/></span>,
      instruction: 'rdlurdlu',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Tip in the eggs and poach them for 4 minutes.<br/></span>,
      instruction: 'e',
      type: 'mash',
      mashCount: 4,
      timer: 10,
    },
    {
      pretext: 'In the meantime,',
      instruction: 'toast',
      posttext: 'the English muffins.',
      timer: 10,
    },
    {
      pretext: 'Ask the Poissonnier when the crab cakes will be finished.',
      timer: 8,
      onTimeout: nextStep,
    },
    {
      pretext: 'Tell the Poissonnier to pass the crab cakes.',
      timer: 8,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Stack the <b>crab cakes</b> on top of the English muffins.</span>,
      type: 'ingredients',
      leftName: 'Plate',
      rightName: 'Food',
      ingredients: [
        {name: 'crab cakes', key: 'c', left: false},
        {name: 'English muffins', key: 'm', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 2) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Finish by pouring hollandaise over the stack (but not too much)!<br/></span>,
      instruction: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhholandaise',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too little&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 18 && progress <= 30) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
  ],
};

module.exports = EggsBenedict;
