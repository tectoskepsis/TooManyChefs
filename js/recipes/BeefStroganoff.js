var React = require('react');

var ColorChange = require('../ColorChange.react.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  cowName: 'pat',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var BeefStroganoff = {
  name: 'Beef Stroganoff',
  chefName: 'Saucier',
  type: 'entrée',
  difficulty: 'medium',
  ingredients: ['2 lbs beef chuck roast', '1/2 tsp salt', '1/2 tsp ground black pepper', '4 oz butter', '4 green onions', '4 tbsp flour', '1 can condensed beef broth', '6 oz sliced mushrooms', '1/3 cup white wine'],
  description: 'A creamy roast served over noodles that melts on your tongue.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Place a hunk of <b>chuck roast</b>, <b>cutting board</b>, and <b>knife</b> on the table.</span>,
      type: 'ingredients',
      leftName: 'Items',
      rightName: 'Table',
      ingredients: [
        {name: 'chuck roast', key: 'c', left: true},
        {name: 'cutting board', key: 'b', left: true},
        {name: 'knife', key: 'k', left: true},
      ],
      timer: 10,
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
      pretext: 'Equip the blade with',
      instruction: 'e',
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
      pretext: <span>Use the arrow keys to turn the dial on the stove to <b className="fireRed">MED</b>.<br/>OFF LOW - - MED - - HIGH - -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WAY TOO HIGH<br/></span>,
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
        } else {
          this.failure();
        }
      },
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
      pretext: <span>Cover the pot with the lid using the arrow keys.<br/></span>,
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
      pretext: <span>As it simmers, think about a nickname for your beef roast.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 7,
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
      pretext: <span>Boil some noodles in a pot with your masterful firebending.<br/></span>,
      instruction: 'f',
      type: 'mash',
      mashCount: 20,
      timer: 10,
    },
    {
      pretext: 'Toss in some mushroms into the beef stew with',
      instruction: 's',
      posttext: '.',
      timer: 9,
    },
    {
      pretext: <span>Pour in <b className="green">1/3 cup</b> of white wine.<br/></span>,
      instruction: 'wiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiine',
      posttext: <span><br/>CUPS:&nbsp;&nbsp;&nbsp;&nbsp;^ 1/6&nbsp;&nbsp;&nbsp;&nbsp;^ 2/6&nbsp;&nbsp;&nbsp;&nbsp;^ 3/6</span>,
      timer: 8,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 17 && progress <= 22) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Top the noodles with your delicious concoction with',
      instruction: 't',
      posttext: '.',
      timer: 6,
    },
  ],
};

module.exports = BeefStroganoff;
