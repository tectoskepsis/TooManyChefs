var React = require('react');

var Audio = require('../Audio.js');
var ColorChange = require('../ColorChange.react.js');
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
  difficulty: 'hard',
  ingredients: ['3 tbsp virgin oil', '2 leeks', '1 onion', '4 garlic cloves', '2 tomatoes', 'one 2-lb live lobster', '2 dozen littleneck clams', '1 lb monkfish', '1 lb red snapper fillet', '1 lb halibut fillet'],
  description: 'A diverse fish stew, as savory as it is unpronounceable.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Grab a',
      instruction: 'large skillet',
      posttext: 'from the pantry.',
      timer: 11,
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
      timer: 9,
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
    {
      pretext: 'Put',
      instruction: () => recipeData.name,
      posttext: 'into a pot.',
      timer: 10,
    },
    {
      pretext: () => <span>Wait for <ColorChange fromColor="#659cf3" toColor="#ff0500">{recipeData.name}</ColorChange> the lobster to turn <b className="fireRed">red</b>; then</span>,
      instruction: 'take',
      posttext: 'it out.',
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
      pretext: () => <span>Mash 'c' to chop {recipeData.name} into nice, 1 inch pieces.<br/></span>,
      instruction: 'c',
      type: 'mash',
      timer: 10,
    },
    {
      pretext: 'Drizzle the lobster with',
      instruction: 'olive oil & vinaigrette',
      posttext: '. Yum!',
      timer: 14,
      onComplete: function() {
        this.nextStep(false, 'yum');
      },
    },
    {
      pretext: <span>Set the heat to <b className="fireRed">MEDIUM-HIGH</b>.<br/>OFF LOW - - - MED - - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 18 && value <= 22) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Add the',
      instruction: 'clams',
      posttext: 'to the pot.',
      timer: 8,
    },
    {
      pretext: 'Drop some',
      instruction: 'monkfish',
      posttext: 'into the pot.',
      timer: 7,
    },
    {
      pretext: 'Take a break and watch your scrumptious aquarium evolve into a delicious stew.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Try to say halibut three times fast:<br/></span>,
      instruction: 'halibuthalibuthalibut',
      timer: 10,
      onProgress: function(value) {
        if (value % 7 === 0) {
          Audio.playSE('halibut');
        }
        return value;
      },
    },
    {
      pretext: <span>While waiting for the fish to cook, cut up some baguettes with 'b'.<br/></span>,
      instruction: 'b',
      type: 'mash',
      mashCount: 20,
      timer: 10,
    },
    {
      pretext: <span>Pour a glass of merlot to go with the meal.<br/></span>,
      instruction: 'meeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrlooooooooooooooot',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ not enough&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;^ overflow&nbsp;&nbsp;&nbsp;&nbsp;alcoholic</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 20 && progress <= 27) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Stir up your fishy concoction.<br/></span>,
      instruction: 'udududud',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Taste a spoonful of the soup to test for flavor with the arrow keys.<br/>&nbsp;&nbsp;&nbsp;(MOUTH)</span>,
      instruction: '(spoon)==',
      type: 'dial',
      startValue: 15,
      onTimeout: function(value) {
        if (value <= 3) {
          this.nextStep(false, 'delicious');
        } else {
          this.failure();
        }
      },
      timer: 9,
    },
    {
      pretext: <span>Not enough salt! Add <b>a tiny bit of seasoning</b>, but not too much!<br/></span>,
      instruction: 'NaaaaaaaaaaaaaaaaaaaaaaClllllllllllllllllllllllllll',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;^ much salt&nbsp;&nbsp;&nbsp;&nbsp;^ so spice&nbsp;&nbsp;&nbsp;&nbsp;^ wow</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 5 && progress <= 11) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Add a',
      instruction: 'spoonful',
      posttext: 'of milk to your soup to make it a bit more creamy.',
      timer: 8,
    },
    {
      pretext: <span>Oh no! You spilt some milk on the ground. Mash 'c' to cry over the spilt milk.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 10,
      timer: 8,
    },
    {
      pretext: <span>Take a few seconds to pull yourself together.<br/>Breathe in, breathe out.</span>,
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Turn <b>off</b> the stove using the arrow keys.<br/>OFF LOW - - - MED - - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 20,
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
      pretext: <span>The soup is ready. Scoop into bowls and serve!<br/></span>,
      instruction: 'bowlbowlbowlbowl',
      timer: 10,
    },
  ],
};

module.exports = Bouillabaisse;
