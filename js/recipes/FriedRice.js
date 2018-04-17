var React = require('react');

var Audio = require('../Audio.js');

var recipeData = {
  chickenName: 'alfred',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var FriedRice = {
  name: 'Chicken Fried Rice',
  chefName: 'Friturier',
  type: 'side',
  difficulty: 'medium',
  ingredients: ['1 onion', '2 cups steamed rice', '2 eggs', '2 tbsp vegetable oil', '8 oz chicken breast', '1/2 cup carrots', 'soy sauce to taste'],
  description: 'A tasty balanced meal, perfect for getting rid of leftover rice.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Type',
      instruction: 'g',
      posttext: 'to grab a cutting board from the kitchen cabinet.',
      timer: 7,
    },
    {
      pretext: <span>Equip a <b>paring knife</b> for +3 attack vs. vegetables.</span>,
      type: 'ingredients',
      leftName: 'Hand',
      rightName: 'Knife Block',
      ingredients: [
        {name: 'paring knife', key: 'p', left: false},
        {name: 'butcher knife', key: 'b', left: false},
        {name: 'spork', key: 's', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'paring knife') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Dice up the carrots into little cubes by mashing 'd'.<br/></span>,
      instruction: 'd',
      type: 'mash',
      onPressSound: 'slice',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: <span>Next, cut up the onions like they threatened your family.<br/></span>,
      instruction: 'c',
      type: 'mash',
      onPressSound: 'slice',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: 'Take a few seconds to mourn the onions for their beautiful sacrifice.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Wipe away a single tear.<br/></span>,
      instruction: 'sad react',
      timer: 8,
    },
    {
      onStart: () => Audio.playSE('sink'),
      pretext: 'Excellent work! Onto the meat. Defrost the chicken by running it under',
      instruction: 'warm',
      posttext: 'water.',
      timer: 10,
    },
    {
      pretext: 'Turn',
      instruction: 'off',
      posttext: 'the faucet to support the environment. Go green!',
      timer: 8,
      onComplete: function() {
        Audio.stopSE('sink');
        this.nextStep();
      },
    },
    {
      pretext: <span>Give the chicken a name.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 6,
      onTimeout: function(name) {
        if (!name) {
          this.failure(<p>Recipe failed. Failed to name chicken.</p>);
        } else {
          recipeData.chickenName = name;
          this.nextStep();
        }
      },
    },
    {
      pretext: () => <span>Cut {recipeData.chickenName} up into little pieces.<br/></span>,
      instruction: () => recipeData.chickenName.split('').join(' '),
      timer: 10,
    },
    {
      pretext: <span>All done! It's time to start cooking. Pour some oil, but <b>not too much</b>, into a wok.<br/></span>,
      instruction: 'ooooooooooooooooooooooooooooooooooooooooooooooooil',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too little&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 10,
      onComplete: () => {},
      onHoldSound: 'pouring',
      onTimeout: function(progress) {
        if (progress >= 18 && progress <= 30) {
          this.nextStep();
        } else if (progress > 30) {
          this.failure(<p>Recipe failed. Too much oil!</p>);
        } else {
          this.failure(<p>Recipe failed. Too little oil!</p>);
        }
      },
    },
    {
      pretext: <span>Use the arrow keys to turn the dial on the stove to <b className="fireRed">HIGH</b>.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 18 && value <= 25) {
          this.nextStep();
        } else if (value > 25) {
          this.failure(<p>Recipe failed. Stove too hot!</p>);
        } else {
          this.failure(<p>Recipe failed. Stove too low!</p>);
        }
      },
    },
    {
      pretext: 'Check your Facebook status while the oil heats up.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      onStart: () => Audio.playSE('frying', {loop: 3}),
      pretext: 'Toss in the onions to',
      instruction: 'soak up',
      posttext: 'the oily goodness.',
      timer: 10,
    },
    {
      pretext: <span>Crack some eggs into a bowl using your friend's thick skull.<br/></span>,
      instruction: 'crack crack',
      timer: 10,
      onProgress: function(value) {
        if (value === 5 || value === 10) {
          Audio.playSE('eggcrack');
        }
        return value;
      },
    },
    {
      pretext: <span>Beat some sense into the eggs by mashing 'b'.<br/></span>,
      instruction: 'b',
      type: 'mash',
      onPressSound: ['eggbeat1', 'eggbeat2'],
      timer: 10,
    },
    {
      pretext: <span>Pour the eggs into the wok with the arrow keys.<br/></span>,
      instruction: '\\eggs\\',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_wok_|</span>,
      type: 'dial',
      onTimeout: function(value) {
        if (value >= 10 && value <= 14) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed. Failed to pour eggs in wok.</p>);
        }
      },
      timer: 9,
    },
    {
      pretext: 'Add in the carrots, and your best friend',
      instruction: () => recipeData.chickenName,
      posttext: '(the chicken).',
      timer: 10,
    },
    {
      pretext: <span>Stir everything around with the arrow keys until it's all mixed up.<br/></span>,
      instruction: 'urdlurdl',
      type: 'arrows',
      timer: 12,
    },
    {
      pretext: 'Dump in all the',
      instruction: 'riiiiiiccccceeeeeeeeeeee',
      timer: 10,
    },
    {
      pretext: <span>Toss the wok to mix everything up every so often by pressing t (but not too often!)<br/></span>,
      instruction: 't',
      type: 'mash',
      mashCount: 5,
      timer: 30,
    },
    {
      pretext: 'Pour in some soy sauce by holding p.',
      instruction: 'ppppppppppppppppppppppppppppppppppppppppppppppppppp',
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
    {
      pretext: 'Stir it up one more time with',
      instruction: 's',
      posttext: '.',
      timer: 7,
    },
    {
      pretext: <span>Use the arrow keys to turn off the stove.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 21,
      timer: 10,
      onProgress: function(value) {
        if (value <= 3) {
          Audio.stopSE('frying');
        }
        return value;
      },
      onTimeout: function(value) {
        Audio.stopSE('frying');
        if (value <= 3) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed. Forgot to turn off stove!</p>);
        }
      },
    },
  ],
};

module.exports = FriedRice;
