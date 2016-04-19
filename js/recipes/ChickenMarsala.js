var React = require('react');

var ColorChange = require('../ColorChange.react.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  left: [],
  right: [],
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
    {
      pretext: 'Microwave the butter for',
      instruction: '45',
      posttext: 'seconds.',
      timer: 8,
    },
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
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;\cup/</span>,
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
    {
      pretext: <span>Get the <b>mushrooms</b>, <b>shallots</b>, and <b>garlic</b> from the fridge onto your cutting board.</span>,
      type: 'ingredients',
      leftName: 'Cutting board',
      rightName: 'Fridge',
      ingredients: [
        {name: 'mushrooms', key: 'm', left: false},
        {name: 'shallots', key: 's', left: false},
        {name: 'garlic', key: 'g', left: false},
        {name: 'leftover Chinese', key: 'l', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 1 && recipeData.right[0].name === 'leftover Chinese') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Use the arrow keys to set the skillet to <b className="fireRed">MED</b> heat.<br/>OFF LOW - - MED - - HIGH - -&nbsp;- - WAY TOO HIGH<br/></span>,
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
      pretext: 'Add the',
      instruction: 'mushrooms garlic shallots',
      posttext: 'into the pan.',
      timer: 10,
    },
    {
      pretext: 'Wait for the moisture to evaporate, then',
      instruction: 'remove',
      posttext: <span>it from the pan to set aside.<br/><br/>&nbsp;&nbsp;&nbsp;<ColorChange toColor="#5cb85c">&#9679;</ColorChange> evaporated</span>,
      timer: 30,
      onComplete: function(progress, time) {
        if (time <= 20) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>What's the next step again? You forget the recipe. Mash 't' to think really hard.<br/></span>,
      instruction: 't',
      type: 'mash',
      mashCount: 10,
      timer: 8,
    },
    {
      pretext: <span>Call your mother to ask her what to do next.<br/></span>,
      instruction: '412 268 6667',
      timer: 9,
    },
    {
      pretext: <span>Mom ignores your question and asks how your day has been and why you haven't called.<br/></span>,
      instruction: 'You tell her: ',
      type: 'textinput',
      timer: 8,
      onTimeout: function(okmom) {
        if (okmom.length < 3) {
          this.failure();
        } else {
          this.nextStep();
        }
      },
    },
    {
      instruction: 'Ask',
      posttext: 'her again what the recipe is.',
      timer: 8,
    },
    {
      pretext: 'Wait and jot down the recipe as she explains it to you.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>She is now ranting about Aunt Marie, but you have a dish to finish...<br/></span>,
      type: 'ingredients',
      leftName: 'Keep listening',
      rightName: 'Hang up on mother',
      ingredients: [
        {name: 'choose', key: 'c', left: true},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1) {
          this.nextStep(false, 0); // repeat
        } else {
          this.nextStep();
        }
      },
    },
    {
      pretext: 'You hang up on her and feel slightly guilty. Type',
      instruction: 'repent',
      posttext: 'and bow your head for forgiveness.',
      timer: 8,
    },
    {
      pretext: <span>Return to your dish and pound the chicken to 1/4 in thickness.<br/></span>,
      instruction: 'p',
      type: 'mash',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: 'Add the',
      instruction: 'butter and chicken',
      posttext: 'to the pan.',
      timer: 8,
    },
    {
      pretext: <span>Wait until the <ColorChange duration={5000} toColor="#a94442">CHICKEN</ColorChange> browns; then</span>,
      instruction: 'flip',
      posttext: 'the chicken over.',
      timer: 20,
      onComplete: function(progress, time) {
        // Only proceed if color is brown
        if (time <= 10) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Spread the veggies into the pan by mashing 'v'.<br/></span>,
      instruction: 'v',
      type: 'mash',
      mashCount: 20,
      timer: 10,
    },
    {
      pretext: <span>Add the <b>broth</b> and <b>marsala wine</b> to the pan.<br/></span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Pan',
      ingredients: [
        {name: 'marsala wine', key: 'm', left: true},
        {name: 'broth', key: 'r', left: true},
        {name: 'veggies', key: 'v', left: false},
        {name: 'chicken', key: 'c', left: false},
        {name: 'butter', key: 'b', left: false},
      ],
      timer: 8,
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
      instruction: 'Stir',
      posttext: 'in some peas into the pan.',
      timer: 7,
    },
    {
      pretext: <span>Add <b className="green">1 tbsp</b> of half-and-half.<br/></span>,
      instruction: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhalf-half',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ 0 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 1 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 2 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 3 tbsp</span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 15 && progress <= 21) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Stir fry your delicious creation using the arrow keys.<br/></span>,
      instruction: 'ududududud',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Take <b>everything out</b>, put it on a plate with <b>pasta</b>, and serve!<br/></span>,
      type: 'ingredients',
      leftName: 'Plate',
      rightName: 'Pan',
      ingredients: [
        {name: 'pasta', key: 't', left: true},
        {name: 'veggies', key: 'v', left: false},
        {name: 'butter', key: 'b', left: false},
        {name: 'peas', key: 'p', left: false},
        {name: 'half-and-half', key: 'h', left: false},
        {name: 'marsala', key: 'm', left: false},
        {name: 'broth', key: 'r', left: false},
        {name: 'chicken', key: 'c', left: false},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 8) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
  ],
};

module.exports = ChickenMarsala;
