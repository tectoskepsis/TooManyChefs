var React = require('react');

var ColorChange = require('../ColorChange.react.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  cowName: 'pat',
};

var nextStep = function() {
  return this.nextStep();
}

var ChickenMarsala = {
  name: 'Chicken Marsala',
  chefName: 'Saucier',
  type: 'entrée',
  difficulty: 'hard',
  ingredients: ['4 tbsp butter', '1 8-oz package mushrooms', '2 tbsp shallots', '1 tbsp minced garlic', '4 chicken breast halves', '1/4 tsp salt', '3/4 cup chicken broth', '1/2 cup Marsala wine', '1/2 cup frozen peas', '8 oz uncooked pasta'],
  description: 'A traditional Italian classic, just the way Mama used to make it.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Grab a <b>glass measuring cup</b> from the pantry.</span>,
      type: 'ingredients',
      leftName: 'Selection',
      rightName: 'Pantry',
      ingredients: [
        {name: 'glass measuring cap', key: 'g', left: false},
        {name: 'glass measuring cup', key: 'm', left: false},
        {name: 'gloss measuring cup', key: 'c', left: false},
        {name: 'glass massaging cup', key: 's', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'glass measuring cup') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Pour 3 tbsp butter into the measuring cup by tapping 'p'.<br/></span>,
      instruction: 'p',
      type: 'mash',
      mashCount: 3,
      timer: 7,
    },
    {
      instruction: 'Place',
      posttext: 'the butter into the microwave.',
      timer: 10,
    },
    // TODO: Microwave step
    {
      pretext: 'Let the butter stand for a bit-- it\'s hot!',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Is it cool yet? Poke the butter with the arrow keys to check.<br/>&nbsp;&nbsp;&nbsp;&nbsp;BUTTER</span>,
      type: 'dial',
      maxValue: 10,
      startValue: 10,
      instruction: '<=finger=',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;\\cup/</span>,
      timer: 10,
      onTimeout: function(value) {
        if (value <= 2) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Nope-- you burn your finger!<br/></span>,
      instruction: 'ouch!',
      timer: 10,
    },
    {
      pretext: <span>Quickly run your finger under <b className="darkBlue">cold water</b>.</span>,
      type: 'ingredients',
      leftName: 'Hot water',
      rightName: 'Cold water',
      ingredients: [
        {name: 'finger', key: 'f', left: true},
      ],
      timer: 6,
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
      pretext: 'Phew! That feels much butter. Now,',
      instruction: 'skim',
      posttext: 'the foam off the top of the melted butter.',
      timer: 9,
    },
    {
      pretext: <span>Using the arrow keys, pour the butter through a fine sieve over a small bowl, to get rid of those nasty butter chunks.<br/></span>,
      type: 'dial',
      maxValue: 10,
      startValue: 10,
      instruction: 'BUTTER',
      posttext: <span><br/>----------SIE|         |EVE------------</span>,
      timer: 10,
      onTimeout: function(value) {
        if (value >= 9 && value <= 12) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Get a <b>non-stick pan</b> from the pantry.</span>,
      type: 'ingredients',
      leftName: 'Selection',
      rightName: 'Pantry',
      ingredients: [
        {name: 'slightly sticky pan', key: 's', left: false},
        {name: 'non-stick pan', key: 'n', left: false},
        {name: 'very sticky pan', key: 'v', left: false},
        {name: 'wok', key: 'w', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'non-stick pan') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Coat the pan with',
      instruction: 'cooking spray',
      posttext: '.',
      timer: 9,
    },

/* TODO */

    {
      pretext: <span>Use the arrow keys to turn the dial on the stove to MED.<br/>OFF LOW - - MED - - HIGH - -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 11 && value <= 15) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed-- did not turn on stove to MED!</p>);
        }
      },
    },
    {
      pretext: <span>Add the <ColorChange duration={5000} toColor="#a94442">BEEF</ColorChange> and cook until brown; then type</span>,
      instruction: 'ready',
      posttext: '.',
      timer: 20,
      onComplete: function(progress, time) {
        // Only proceed if color is brown
        if (time <= 10) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed. Patty not cooked to brown.</p>);
        }
      },
    },
    {
      pretext: 'Toss in the onions by pressing',
      instruction: 't',
      posttext: '.',
      timer: 7,
    },
    {
      pretext: 'Daydream about grazing cows while the onions sizzle.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Stir in the flour by tapping 'f'.<br/></span>,
      instruction: 'f',
      type: 'mash',
      mashCount: 10,
      timer: 8,
    },
    {
      pretext: <span>Pour in beef broth, but not too much!<br/></span>,
      instruction: 'beeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef broth',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ too little &nbsp;&nbsp;&nbsp;&nbsp;^ just right &nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 20 && progress <= 25) {
          this.nextStep();
        } else if (progress > 25) {
          this.failure(<p>Recipe failed, too much beef broth!</p>);
        } else {
          this.failure(<p>Recipe failed, not enough beef broth!</p>);
        }
      },
    },
    {
      pretext: <span>Stir the contents with the arrow keys.<br/></span>,
      instruction: 'urdlurdl',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Lower the heat on the stove to LOW.<br/>OFF LOW - - MED - - HIGH - -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 13,
      timer: 10,
      onTimeout: function(value) {
        if (value >= 3 && value <= 7) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed-- did not turn stove to LOW!</p>);
        }
      },
    },
    {
      pretext: <span>Cover the pot with the lid.<br/></span>,
      instruction: '/lid\\',
      type: 'dial',
      maxValue: 20,
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-POT-</span>,
      timer: 9,
      onTimeout: function(value) {
        if (value >= 7 && value <= 11) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed. Failed to put lid on pot.</p>);
        }
      },
    },
    {
      pretext: 'Let it simmer for a time. Daydream about cows again.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Think about what you would call your very own cow.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 6,
      onTimeout: function(name) {
        if (!name) {
          this.failure(<p>Recipe failed. Failed to name cow.</p>);
        } else {
          recipeData.cowName = name;
          this.nextStep();
        }
      },
    },
    {
      pretext: 'Yes, what a good name! Tell',
      instruction: () => recipeData.cowName,
      posttext: 'to the beef roast sitting in the skillet.',
      timer: 8,
    },
    {
      pretext: <span>Fill up a different pot with water.<br/></span>,
      instruction: '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~water~',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ too little &nbsp;&nbsp;&nbsp;&nbsp;^ just right &nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 20 && progress <= 25) {
          this.nextStep();
        } else if (progress > 25) {
          this.failure(<p>Recipe failed, too much water!</p>);
        } else {
          this.failure(<p>Recipe failed, not enough water!</p>);
        }
      },
    },
    {
      pretext: <span>Boil the water with some masterful firebending.<br/></span>,
      instruction: 'f',
      type: 'mash',
      mashCount: 20,
      timer: 10,
    },
    {
      pretext: 'Add',
      instruction: 'noodles',
      posttext: 'to the pot.',
      timer: 10,
    },
    {
      pretext: <span>Pour out the water with the arrow keys, but keep the noodles!<br/></span>,
      instruction: 'noodles  ~w~a~t~e~r~',
      posttext: <span><br/>-------------------&nbsp;&nbsp;&nbsp;\_SINK_/</span>,
      type: 'dial',
      maxValue: 25,
      timer: 10,
      onTimeout: function(value) {
        if (value >= 10 && value <= 14) {
          this.nextStep();
        } else if (value > 14) {
          this.failure(<p>Recipe failed, poured out noodles!</p>);
        } else {
          this.failure(<p>Recipe failed, failed to pour out water.</p>);
        }
      },
    },
    {
      pretext: 'Toss in some',
      instruction: 'mushrooms',
      posttext: 'into the beef stew.',
      timer: 9,
    },
    {
      pretext: <span>Pour in 1/3 cup of white wine.<br/></span>,
      instruction: 'wiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiine',
      posttext: <span><br/>CUPS:&nbsp;&nbsp;&nbsp;&nbsp;^ 1/6 &nbsp;&nbsp;&nbsp;&nbsp;^ 2/6 &nbsp;&nbsp;&nbsp;&nbsp;^ 3/6</span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 17 && progress <= 22) {
          this.nextStep();
        } else if (progress > 22) {
          this.failure(<p>Recipe failed, too much white wine!</p>);
        } else {
          this.failure(<p>Recipe failed, not enough white wine!</p>);
        }
      },
    },
    {
      pretext: 'Top the noodles with your delicious concoction with',
      instruction: 't',
      posttext: '.',
      timer: 6,
    },
    {
      pretext: 'Wave goodbye to',
      instruction: () => recipeData.cowName,
      posttext: 'as you finish the meal.',
      timer: 10,
    },
  ],
};

module.exports = ChickenMarsala;
