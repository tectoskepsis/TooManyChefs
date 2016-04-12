var React = require('react');

var Audio = require('../Audio.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  fishName: 'fred',
};

var nextStep = function() {
  return this.nextStep();
}

var FishCurry = {
  name: 'Fish Curry',
  chefName: 'Poissonnier',
  type: 'entrée',
  difficulty: 'medium',
  ingredients: ['2 lbs fish fillet', '2 tbsp garlic paste', '2 inch ginger root', '5 medium shallots', '7 red chilis', '1 tbsp cumin seed', '3 tsp turmeric powder', '1/2 tbsp coriander powder'],
  description: 'A flavorful curry full of spices and surprises.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Take out a',
      instruction: 'grinder',
      posttext: 'from your back pocket.',
      timer: 10,
    },
    {
      pretext: <span>Type to add onions, ginger, cumin seeds, and chili into the grinder.<br/></span>,
      instruction: 'ogcsc',
      timer: 10,
    },
    {
      pretext: <span>Crank the grinder using the arrow keys.<br/></span>,
      instruction: 'udududud',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Cut tomatoes into little pieces by mashing 't'.<br/></span>,
      instruction: 't',
      type: 'mash',
      onPressSound: 'slice',
      mashCount: 10,
      timer: 10,
    },
    {
      pretext: <span>Name the tilapia fish sacrificing itself for your meal.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 8,
      onTimeout: function(name) {
        if (!name) {
          this.failure();
        } else {
          recipeData.fishName = name;
          this.nextStep();
        }
      },
    },
    {
      pretext: () => <span>Line up the knife to slice off {recipeData.fishName}'s tail.<br/></span>,
      instruction: 'v',
      posttext: <span><br/>&nbsp;{'<FISH-FISH==<'}</span>,
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        Audio.playSE('slice');
        if (value >= 10 && value <= 13) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Type',
      instruction: 'fillet',
      posttext: 'to cut up the rest of the fish.',
      timer: 8,
    },
    {
      pretext: <span>Sprinkle 2 tsp of salt, 2 tsp of turmeric powder, and garlic paste.<br/></span>,
      instruction: 'sstptpgp',
      timer: 10,
    },
    {
      pretext: 'Stretch your legs while the fish marinates.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Grab a <b>wok</b> from the cabinet.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Cabinet',
      ingredients: [
        {name: 'pan', key: 'p', left: false, sound: 'cupboard'},
        {name: 'clock', key: 'c', left: false, sound: 'cupboard'},
        {name: 'wok', key: 'w', left: false, sound: 'cupboard'},
        {name: 'duck', key: 'd', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'wok') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
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
      pretext: () => <span>Reassure {recipeData.fishName} that the next step won't hurt at all.<br/></span>,
      instruction: 'sssshhhhhhhh',
      timer: 10,
    },
    {
      pretext: <span>Countdown from 5 as the oil heats up.<br/></span>,
      instruction: '5 4 3 2 1',
      timer: 10,
    },
    {
      pretext: () => <span>Toss {recipeData.fishName} into the air by mashing 't'.<br/></span>,
      instruction: 't',
      type: 'mash',
      mashCount: 12,
      timer: 8,
    },
    {
      pretext: () => <span>Move the wok to catch {recipeData.fishName} before it falls.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ fish<br/></span>,
      instruction: '\\wok/',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 4 && value <= 8) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Put the wok back on the stove and begin to',
      instruction: 'deep fry',
      posttext: '.',
      timer: 8,
      onComplete: function() {
        Audio.playSE('frying');
        this.nextStep();
      },
    },
    {
      pretext: 'Add a',
      instruction: 'pinch',
      posttext: 'of the ground paste into the wok.',
      timer: 8,
    },
    {
      pretext: <span>Stir the paste with the arrow keys.<br/></span>,
      instruction: 'rulurul',
      type: 'arrows',
      timer: 8,
    },
    {
      pretext: <span>Pour <b className="green">3 cups</b> of water into the wok.<br/></span>,
      instruction: 'waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaater',
      posttext: <span><br/>CUPS:&nbsp;&nbsp;&nbsp;&nbsp;^ 1&nbsp;&nbsp;&nbsp;&nbsp;^ 2&nbsp;&nbsp;&nbsp;&nbsp;^ 3&nbsp;&nbsp;&nbsp;&nbsp;^ 4</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 20 && progress <= 26) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'While the curry boils, nod your head to the beat.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Turn off the stove.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 21,
      timer: 7,
      onProgress: function(value) {
        if (value <= 3) {
          Audio.stopSE('frying');
        }
      },
      onTimeout: function(value) {
        if (value <= 3) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Take the fish curry and',
      instruction: 'pour',
      posttext: 'into a bowl.',
      timer: 8,
    },
    {
      pretext: <span>Garnish with a few coriander leaves.<br/></span>,
      instruction: 'g',
      type: 'mash',
      mashCount: 4,
      timer: 7,
    },
    {
      pretext: 'Finally,',
      instruction: 'pass',
      posttext: 'the dish to the Friturier to pair with the fried rice.',
      timer: 9,
    },
  ],
};

module.exports = FishCurry;
