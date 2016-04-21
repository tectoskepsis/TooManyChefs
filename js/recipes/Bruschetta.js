var React = require('react');

var Audio = require('../Audio.js');
var ColorChange = require('../ColorChange.react.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  drink: 'water',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var Bruschetta = {
  name: 'Bruschetta',
  chefName: 'Garde Manger',
  type: 'appetizer',
  difficulty: 'medium',
  ingredients: ['1/2 baguette', '2 lg cloves garlic', '1 tsp extra-virgin olive oil', '8 small plum tomatoes', '1/4 cup Parmesan cheese', '1/3 cup basil', '1 tbsp balsamic vinegar', '1/4 tsp black pepper', '1/4 tsp kosher salt'],
  description: 'The best thing since sliced bread, this savory appetizer topped with tomatoes brings a crunch to the table.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Using the arrow keys, move the tomatoes onto the cutting board.<br/></span>,
      instruction: '(tmt)',
      type: 'dial',
      maxValue: 16,
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--board--</span>,
      timer: 7,
      onTimeout: function(value) {
        if (value >= 12 && value <= 17) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Type',
      instruction: 'de-seed',
      posttext: 'to remove the tomato seeds.',
      timer: 8,
    },
    {
      pretext: <span>Mash 'c' to chop the tomatoes into little cubes.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 20,
      onPressSound: 'slice',
      timer: 10,
    },
    {
      pretext: 'Mince the',
      instruction: 'g a r l i c c l o v e s',
      posttext: 'with your knife.',
      timer: 10,
      onProgress: function(value) {
        if (value % 4 === 0) {
          Audio.playSE('slice');
        }
        return value;
      },
  },
    {
      pretext: <span>Grab a <b>cheese grater</b> from the lower shelf.</span>,
      type: 'ingredients',
      leftName: 'Hand',
      rightName: 'Shelf',
      ingredients: [
        {name: 'chess grader', key: 'c', left: false},
        {name: 'chess greater', key: 'g', left: false},
        {name: 'cheese lesser', key: 'l', left: false},
        {name: 'cheese grater', key: 'h', left: false},
      ],
      timer: 9,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'cheese grater') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Tap 'g' to grate the cheese into little shreds.<br/></span>,
      instruction: 'g',
      type: 'mash',
      mashCount: 10,
      timer: 8,
    },
    {
      pretext: 'Put the',
      instruction: 'veggies and cheese',
      posttext: 'into a large bowl.',
      timer: 12,
    },
    {
      pretext: <span>Using the arrow keys, toss the bowl around.<br/></span>,
      instruction: 'lulrdrlulrdr',
      type: 'arrows',
      timer: 7,
    },
    {
      pretext: <span>A little overexcited, you dropped a leaf on the ground.<br/><b className="fireRed">Don't</b></span>,
      instruction: 'step',
      posttext: 'on it!',
      onComplete: function() {
        this.failure();
      },
      onTimeout: nextStep,
      timer: 10,
    },
    {
      pretext: 'Sweep the dropped veggies into the',
      instruction: 'trash',
      posttext: '.',
      timer: 8,
    },
    {
      pretext: <span>Replace your <b>vegetable knife</b> with a <b>bread knife</b>.</span>,
      type: 'ingredients',
      leftName: 'Hand',
      rightName: 'Knife Block',
      ingredients: [
        {name: 'vegetable knife', key: 'v', left: true},
        {name: 'carving knife', key: 'c', left: false},
        {name: 'bread knife', key: 'b', left: false},
        {name: 'throwing knife', key: 't', left: false},
        {name: 'shuriken', key: 's', left: false},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'bread knife') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Cut the',
      instruction: 'b a g u e t t e',
      posttext: 'into multiple slices.',
      timer: 10,
    },
    {
      pretext: <span>Set the toaster oven dial to <b className="fireRed">TOAST</b>.<br/>WARM - BROIL - BAKE - TOAST - BURN<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 9,
      onTimeout: function(value) {
        if (value >= 20 && value <= 26) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Put the <b>baguette slices</b> into the toaster.</span>,
      type: 'ingredients',
      leftName: 'Mouth',
      rightName: 'Toaster',
      ingredients: [
        {name: 'bag', key: 'b', left: true},
        {name: 'gue', key: 'g', left: true},
        {name: 'ette', key: 'e', left: true},
      ],
      timer: 8,
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
      pretext: <span>Close the toaster oven by pressing right.<br/></span>,
      instruction: 'r',
      type: 'arrows',
      timer: 5,
    },
    {
      pretext: <span>Study the etymology of the word "baguette" as it toasts.<br/>Bacchetta (<i>Ital</i>). wand or baton.</span>,
      timer: 10,
      onTimeout: function() {
        this.nextStep(false, 'bacchetta');
      },
    },
    {
      pretext: <span>Back to the veggies! Measure out <b className="green">1 tsp</b> of balsamic vinegar.<br/></span>,
      instruction: 'bbbbbbbb',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Key: <span className="darkBlue">bbbb</span> = <span className="green">1 tsp</span></b></span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 3 && progress <= 5) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Pour in <b className="green">1 tsp</b> of olive oil.<br/></span>,
      instruction: 'ooooooooooooooooooooooooooooooooooooooooooooooooooooil',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 2/7 tbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 5/7 tbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 8/7 tbsp</span>,
      timer: 10,
      onHoldSound: 'pouring',
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
      pretext: <span>Grind in some pepper by mashing 'p'.<br/></span>,
      instruction: 'p',
      type: 'mash',
      mashCount: 10,
      timer: 7,
    },
    {
      pretext: <span>Toss the bowl again, this time less vigorously.<br/></span>,
      instruction: 'luuruul',
      type: 'arrows',
      timer: 7,
    },
    {
      pretext: <span>Wait for the toaster oven to ding.<br/><br/></span>,
      posttext: <span>&nbsp;&nbsp;&nbsp;<span className="fireRed">&#9679;</span> toasted</span>,
      timer: 600,
      onStart: function() {
        this.setTimeout(nextStep, 10000); // just wait 10 seconds
      },
    },
    {
      pretext: <span>Grab a <b>drink</b> <b className="fireRed">(just one!)</b> from the fridge while you wait.</span>,
      type: 'ingredients',
      leftName: 'Hand',
      rightName: 'Fridge',
      ingredients: [
        {name: 'grape soda', key: 'g', left: false},
        {name: 'orange soda', key: 'o', left: false},
        {name: 'baking soda', key: 'b', left: false},
        {name: 'lemon soda', key: 'l', left: false},
        {name: 'water', key: 'w', left: false},
      ],
      timer: 9,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name !== 'baking soda') {
          recipeData.drink = recipeData.left[0].name;
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: () => <span>You're feeling pretty parched. Drink as much {recipeData.drink} as you can by holding 'o'!<br/></span>,
      instruction: 'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ so thirsty&nbsp;&nbsp;&nbsp;&nbsp;^ still thirsty&nbsp;&nbsp;&nbsp;&nbsp;^ keep going</span>,
      timer: 10,
      onComplete: function() {
        this.nextStep(false, 'delicious');
      },
      onTimeout: function(progress) {
        if (progress >= 45) {
          this.nextStep(false, 'delicious');
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Ah, so refreshing. But now you really need to go to the bathroom! Use the arrow keys to run.<br/>BATHROOM&nbsp;&nbsp;&nbsp;&nbsp;DINING&nbsp;&nbsp;&nbsp;&nbsp;CLOSET&nbsp;&nbsp;&nbsp;&nbsp;KITCHEN&nbsp;&nbsp;&nbsp;&nbsp;OUTSIDE<br/></span>,
      type: 'dial',
      startValue: 33,
      instruction: '^',
      timer: 10,
      onTimeout: function(value) {
        if (value <= 7) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Hold 'p' to let go.<br/></span>,
      instruction: 'ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ not enough&nbsp;&nbsp;&nbsp;&nbsp;^ keep going&nbsp;&nbsp;&nbsp;&nbsp;^ almost there</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: nextStep,
      onTimeout: function(progress) {
        if (progress >= 40) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      onStart: () => Audio.playSE('sink', {loop: 3}),
      pretext: <span>Mash 'w' to wash your hands.<br/></span>,
      instruction: 'w',
      type: 'mash',
      mashCount: 15,
      timer: 10,
    },
    {
      pretext: <span>Don't forget to use <b className="green">soap</b>!</span>,
      type: 'ingredients',
      leftName: 'No soap',
      rightName: 'Soap',
      ingredients: [
        {name: 'hand', key: 'h', left: true},
      ],
      timer: 6,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        Audio.stopSE('sink');
        if (recipeData.right.length === 1) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Return to the',
      instruction: 'kitchen',
      posttext: 'and check on your toaster.',
      timer: 8,
    },
    {
      pretext: <span>Tap left to take out the toasted bread.<br/></span>,
      instruction: 'l',
      type: 'arrows',
      timer: 7,
    },
    {
      pretext: <span>Man, it smells good! Do your best <b className="fireRed">not</b> to</span>,
      instruction: 'eat',
      posttext: 'the toast.',
      onComplete: function() {
        this.failure();
      },
      onTimeout: nextStep,
      timer: 10,
    },
    {
      pretext: 'Top the toasted bread with the',
      instruction: 'balsamic tomato mix',
      posttext: 'and serve!',
      timer: 10,
    },
  ],
};

module.exports = Bruschetta;
