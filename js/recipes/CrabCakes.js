var React = require('react');

var Audio = require('../Audio.js');
var ColorChange = require('../ColorChange.react.js');

var recipeData = {
  crabName: 'charlie',
};

var nextStep = function() {
  return this.nextStep();
};

var CrabCakes = {
  name: 'Crab Cakes',
  chefName: 'Poissonnier',
  type: 'appetizer',
  difficulty: 'medium',
  ingredients: ['1 egg', '8 oz crabmeat', '1/2 cup crackers', '3 tbsp mayonnaise', '4 tsp lemon juice', '1 tbsp butter', '1 tbsp green onion', 'Worcestershire sauce'],
  description: 'This delightful appetizer starts the meal with a tender yet crunchy crunch.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Crack an egg into a bowl by tapping ',
      instruction: 'e',
      posttext: '.',
      timer: 8,
      onComplete: function() {
        this.nextStep(false, 'eggcrack');
      },
    },
    {
      pretext: <span>Drip in 4 tsp lemon juice with 'd'.<br/></span>,
      instruction: 'd',
      type: 'mash',
      mashCount: 4,
      timer: 10,
    },
    {
      pretext: <span>Scoop in <b className="green">3 tbsp</b> mayonnaise by holding 'm'. (Don't overdose!)<br/><br/></span>,
      instruction: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm-mayo!',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ 1 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 2 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 3 tbsp&nbsp;&nbsp;&nbsp;&nbsp;^ 1 HEART ATTACK</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 25 && progress <= 33) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Type',
      instruction: 'whisk',
      posttext: 'to equip the tool for +2 bonus to stirring.',
      timer: 10,
    },
    {
      pretext: <span>Mash 'w' to mix together the creamy concoction.<br/></span>,
      instruction: 'w',
      type: 'mash',
      mashCount: 15,
      timer: 10,
    },
    {
      pretext: <span>Name your friendly crab as you prepare him for devouring.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 6,
      onTimeout: function(name) {
        if (!name) {
          this.failure(<p>Recipe failed. Failed to name crab.</p>);
        } else {
          recipeData.crabName = name;
          this.nextStep();
        }
      },
    },
    {
      pretext: 'Gently toss',
      instruction: () => recipeData.crabName,
      posttext: 'into the bowl while continuing to stir.',
      timer: 10,
    },
    {
      pretext: 'Crush the crackers into little',
      instruction: 'c r u m b s',
      posttext: 'and drop them into the bowl.',
      timer: 8,
    },
    {
      pretext: <span>Continue stirring the mixture with the arrow keys.<br/></span>,
      instruction: 'uldruldr',
      type: 'arrows',
      timer: 8,
    },
    {
      pretext: () => <span>Take a short break and chat with {recipeData.crabName} about the finer things in life.</span>,
      timer: 10,
      onTimeout: nextStep,
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
          this.failure(<p>Recipe failed-- did not turn on stove to MED!</p>);
        }
      },
    },
    {
      onStart: () => Audio.playSE('frying', {loop: 6}),
      pretext: 'Melt the',
      instruction: 'butter',
      posttext: 'on a skillet over the heat.',
      timer: 8,
    },
    {
      instruction: 'SMUSH',
      posttext: () => <span>{recipeData.crabName} into 4 different {recipeData.crabName} patties.</span>,
      timer: 10,
    },
    {
      pretext: <span>Place the patties on the skillet using the arrow keys.<br/></span>,
      instruction: '{PATTY}',
      type: 'dial',
      maxValue: 16,
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-skillet-</span>,
      timer: 10,
      onTimeout: function(value) {
        if (value >= 12) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed. Failed to put patty on skillet.</p>);
        }
      },
    },
    {
      pretext: 'Cook the patty and',
      instruction: 'flip',
      posttext: <span>it when golden brown.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ColorChange>{'{PATTY}'}</ColorChange><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-skillet-</span>,
      timer: 30,
      onComplete: function(progress, time) {
        // Only proceed if color is golden brown
        if (time <= 20) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed. Patty not cooked to golden brown.</p>);
        }
      },
    },
    {
      pretext: () => <span>Tell {recipeData.crabName} a joke while he lies there to ease his suffering.<br/>Q: Why did the crab cross the road?<br/></span>,
      instruction: 'A: ',
      type: 'textinput',
      timer: 8,
      onTimeout: function(joke) {
        if (!joke) {
          this.failure(<p>Recipe failed. Failed to tell joke!</p>);
        } else {
          this.nextStep(false, 'haha');
        }
      },
    },
    {
      pretext: <span>Poke {recipeData.crabName} with the arrow keys so he laughs at your joke.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{PATTY}'}</span>,
      type: 'dial',
      maxValue: 10,
      startValue: 10,
      instruction: '<=finger=',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-skillet-</span>,
      timer: 10,
      onProgress: function(value) {
        if (value === 0) {
          this.playSE('haha');
        }
        return value;
      },
      onTimeout: function(value) {
        if (value <= 2) {
          this.nextStep(false, 'haha');
        } else {
          this.failure(<p>Recipe failed, failed to poke patty!</p>);
        }
      },
    },
    {
      pretext: <span>Remove the patties and turn off the heat.<br/>OFF LOW - - MED - - HIGH - - - - WAY TOO HIGH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 13,
      timer: 9,
      onProgress: function(value) {
        if (value <= 3) {
          Audio.stopSE('frying');
        }
        return value;
      },
      onTimeout: function(value) {
        console.log(value);
        Audio.stopSE('frying');
        if (value <= 3) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed-- did not turn off stove.</p>);
        }
      },
    },
    {
      pretext: <span>Pour some of your favorite Worcestershire sauce, but <b>not too much</b>.<br/></span>,
      instruction: 'wooooooooooooooooooooooooooooooooooorcestershire',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ too little &nbsp;&nbsp;&nbsp;&nbsp;^ just right &nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 20 && progress <= 25) {
          this.nextStep();
        } else if (progress > 25) {
          this.failure(<p>Recipe failed, too much Worcestershire sauce!</p>);
        } else {
          this.failure(<p>Recipe failed, not enough Worcestershire sauce!</p>);
        }
      },
    },
    {
      pretext: <span>Finally, garnish with some leaves you found outside in your front yard.<br/></span>,
      instruction: 'g',
      type: 'mash',
      mashCount: 5,
      timer: 7,
    },
  ],
};

module.exports = CrabCakes;
