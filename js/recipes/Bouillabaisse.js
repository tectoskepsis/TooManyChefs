var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  name: 'jimmy',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var Bouillabaisse = {
  name: 'Bouillabaisse',
  chefName: 'Entremetier',
  type: 'side',
  difficulty: 'medium',
  ingredients: ['3 tbsp virgin oil', '2 leeks', '1 onion', '4 garlic cloves', '2 tomatoes', 'one 2-lb live lobster', '2 dozen littleneck clams', '1 lb monkfish', '1 lb red snapper fillet', '1 lb halibut fillet'],
  description: 'A diverse fish stew, as savory as it is unpronounceable.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Grab a',
      instruction: 'large skillet',
      posttext: 'from the pantry.',
      timer: 10,
    },
    {
      pretext: <span>Put <b className="green">3 tbsp</b> of olive oil (but <b>no more</b>) into the pan.<br/></span>,
      instruction: 'oooooooooo',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Key: <span className="darkBlue">oo</span> = <span className="green">1 tbsp</span></b></span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 5 && progress <= 7) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Turn on the stove to <b className="fireRed">MED</b> heat.<br/>OFF LOW - - MED - - HIGH - - - - TOO HIGH<br/></span>,
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
      pretext: <span>While it heats up, grab a <b>food processor</b> from the cupboard to make the croutons.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Cupboard',
      ingredients: [
        {name: 'food processor', key: 'r', left: false},
        {name: 'computer processor', key: 'c', left: false},
        {name: 'word processor', key: 'w', left: false},
        {name: 'firewood processor', key: 'f', left: false},
      ],
      timer: 7,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'food processor') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      instruction: 'S p r i n k l e',
      posttext: 'the diced bread with water and put it into the food processor.',
      timer: 9,
    },
    {
      pretext: <span>Mash 't' to sprinkle garlic, cayenne, and salt into the processor.<br/></span>,
      instruction: 't',
      type: 'mash',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: <span>Press the arrow keys to process the food into crouton chunks.<br/></span>,
      instruction: 'urrullurrd',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Add tomatoes, leeks, onions, fennel, and chopped garlic into the now-heated pan.<br/></span>,
      instruction: 'tlofcg',
      timer: 8,
    },
    {
      pretext: <span>Use the food processor to pulse the veggies and broth into a puree.<br/></span>,
      instruction: 'ududlrlrududlrlr',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: 'Get a',
      instruction: 'large pot',
      posttext: 'from the cupboard.',
      timer: 8,
    },
    {
      pretext: <span>Wait for the pot to boil. <b className="fireRed">Don't stare</b> at it or it won't boil!<br/></span>,
      instruction: 'stare',
      timer: 8,
      onComplete: function() {
        this.failure();
      },
      onTimeout: nextStep,
    },
    {
      pretext: <span>Give the lobster a name.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 6,
      onTimeout: function(name) {
        if (!name) {
          this.failure();
        } else {
          recipeData.name = name;
          this.nextStep();
        }
      },
    },

    // TODO: steps below
    {
      pretext: <span>Next, cut up the onions like they threatened your family.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: 'Take a few seconds to mourn the onions for their beautiful sacrifice.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
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
      timer: 9,
    },
    {
      pretext: 'Add in the carrots, and your best friend',
      instruction: () => recipeData.chickenName,
      posttext: '(the chicken).',
      timer: 10,
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
      timer: 7,
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

module.exports = Bouillabaisse;
