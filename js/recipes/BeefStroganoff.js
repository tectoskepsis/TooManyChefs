var React = require('react');

var ColorChange = require('../ColorChange.react.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  cowName: 'pat',
};

var nextStep = function() {
  return this.nextStep();
}

var BeefStroganoff = {
  name: 'Beef Stroganoff',
  type: 'entree',
  difficulty: 'medium',
  ingredients: ['2 lbs beef chuck roast', '1/2 tsp salt', '1/2 tsp ground black pepper', '4 oz butter', '4 green onions', '4 tbsp flour', '1 can condensed beef broth', '6 oz sliced mushrooms', '1/3 cup white wine'],
  description: 'A creamy roast served over noodles that melts on your tongue.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Grab a hunk of chuck',
      instruction: 'roast',
      posttext: ', cutting board, and knife.',
      timer: 12,
    },
    {
      pretext: 'Equip the',
      instruction: 'blade',
      posttext: 'for +2 STR.',
      timer: 10,
    },
    {
      pretext: <span>Cut the roast into strips by tapping 'k'.<br/></span>,
      instruction: 'k',
      type: 'mash',
      mashCount: 10,
      timer: 8,
    },
    {
      pretext: <span>Season with a little bit of salt and pepper.<br/></span>,
      instruction: 's',
      type: 'mash',
      mashCount: 4,
      timer: 7,
    },
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
      pretext: 'Melt the',
      instruction: 'butter',
      posttext: 'with a large skillet over the heat.',
      timer: 10,
    },
    {
      pretext: <span>Add the beef and cook until brown; then push it to one side with the arrow keys.<br/>|</span>,
      instruction: <span><ColorChange duration={5000} toColor="#a94442">BEEF</ColorChange>{'<=finger='}</span>,
      posttext: <span><br/>----------------------------</span>,
      type: 'dial',
      maxValue: 10,
      startValue: 10,
      timer: 15,
      onTimeout: function(value) {
        if (value <= 2) {
          this.nextStep();
        } else {
          this.failure(<p>Recipe failed, failed to push beef to left!</p>);
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

module.exports = BeefStroganoff;
