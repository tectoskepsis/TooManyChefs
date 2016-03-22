var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  chickenName: 'alfred',
};

var nextStep = function() {
  return this.nextStep();
}

var FriedRice = {
  name: 'Chicken Fried Rice',
  type: 'entree',
  difficulty: 'medium',
  ingredients: ['1 onion', '2 cups steamed rice', '2 eggs', '2 tbsp vegetable oil', '8 oz chicken breast', '1/2 cup carrots', 'soy sauce to taste'],
  description: 'A tasty balanced meal, perfect for getting rid of leftover rice.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Grab a',
      instruction: 'cutting board',
      posttext: 'from the kitchen cabinet.',
      timer: 15,
    },
    {
      pretext: 'Equip a',
      instruction: 'knife',
      posttext: 'for +3 ATK vs vegetables.',
      timer: 15,
    },
    {
      pretext: <span>Dice up the carrots into little cubes by mashing 'd'.<br/></span>,
      instruction: 'd',
      type: 'mash',
      mashCount: 10,
      timer: 15,
    },
    {
      pretext: <span>Next, cut up the onions like they threatened your family.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 10,
      timer: 15,
    },
    {
      pretext: 'Take a few seconds to mourn the onions for their beautiful sacrifice.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Wipe away a single tear.<br/></span>,
      instruction: ':\'(',
      timer: 10,
    },
    {
      pretext: 'Excellent work! Onto the meat. Hmm... you forgot to defrost it, didn\'t you. Nuke the sucker in the microwave for',
      instruction: '60',
      posttext: 'seconds.',
      timer: 10,
    },
    {
      pretext: 'Wait, why did you do that? You can just press the',
      instruction: 'defrost',
      posttext: 'button.',
      timer: 10,
    },
    {
      pretext: 'Reflect on your sins while the chicken spins.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Take the chicken out and give it a name.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 10,
      onTimeout: function(name) {
        recipeData.chickenName = name;
        this.nextStep();
      },
    },
    {
      pretext: () => <span>Cut {recipeData.chickenName} up into little pieces.<br/></span>,
      instruction: () => recipeData.chickenName.split('').join(' '),
      timer: 10,
    },
    {
      pretext: <span>All done! It's time to start cooking. Pour some oil, but not too much, into a wok.<br/></span>,
      instruction: 'ooooooooooooooooooooooooooooooooooooooooooooooooil',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too little&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 10,
      onComplete: () => {},
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
      pretext: <span>Use the arrow keys to turn the dial on the stove to HIGH.<br/>OFF LOW - - MED - - HIGH - -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WAY TOO HIGH<br/></span>,
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
      pretext: 'Toss in the onions to',
      instruction: 'soak up',
      posttext: 'the oily goodness.',
      timer: 10,
    },
    {
      pretext: <span>Crack some eggs into a bowl using your friend's thick skull.<br/></span>,
      instruction: 'crack crack',
      timer: 10,
    },
    {
      pretext: <span>Beat some sense into the eggs by mashing 'b'.<br/></span>,
      instruction: 'b',
      type: 'mash',
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
      timer: 10,
    },
    {
      pretext: 'Add in the carrots, and your best friend',
      instruction: () => recipeData.chickenName,
      posttext: '(the chicken).',
      timer: 10,
    },
    {
      pretext: <span>Stir everything around until it's all mixed up.<br/></span>,
      instruction: 'carrotchickeneggchickcareggenrot',
      timer: 15,
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
        } else if (progress > 30) {
          this.failure(<p>Recipe failed. Too much soy sauce!</p>);
        } else {
          this.failure(<p>Recipe failed. Not enough soy sauce!</p>);
        }
      },
    },
    {
      pretext: 'Stir it up one more time with',
      instruction: 's',
      posttext: '.',
      timer: 5,
    },
    {
      pretext: <span>Use the arrow keys to turn off the stove.<br/>OFF LOW - - MED - - HIGH - -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 21,
      timer: 10,
      onTimeout: function(value) {
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
