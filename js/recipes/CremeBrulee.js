var React = require('react');

var Audio = require('../Audio.js');
var ColorChange = require('../ColorChange.react.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  name: 'bready',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

var CremeBrulee = {
  name: 'Crème Brûlée',
  chefName: 'Pâtissier',
  type: 'dessert',
  difficulty: 'hard',
  ingredients: ['1 qt heavy cream', '1 vanilla bean', '1 cup vanilla sugar', '6 large eggs', '2 qt hot water', '1 blowtorch'],
  description: 'A creamy custard topped with caramelized sugar, sweet enough to melt a sweetheart\'s heart.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Using the arrow keys, preheat the oven to 325°F.<br/></span>,
      instruction: 300,
      type: 'counter',
      goalValue: 325,
      timer: 8,
      onTimeout: function(value) {
        if (value >= 320 && value <= 330) {
          this.nextStep();
        } else {
          this.failure();
        }
      }
    },
    {
      pretext: <span>Grab a <b>medium saucepan</b> from the pantry.</span>,
      type: 'ingredients',
      leftName: 'Hand',
      rightName: 'Pantry',
      ingredients: [
        {name: 'wok', key: 'w', left: false},
        {name: 'cup', key: 'c', left: false},
        {name: 'mug', key: 'm', left: false},
        {name: 'skillet', key: 's', left: false},
      ],
      timer: 7,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: nextStep,
    },
    {
      pretext: <span>Uh oh! Looks like the saucepan was lost in the <b className="fireRed">Great Cheesecake Fire of 2016</b>. Mash 'r' quickly to run to the store and buy another.<br/></span>,
      instruction: 'r',
      type: 'mash',
      mashCount: 20,
      timer: 10,
    },
    {
      pretext: 'Buy a saucepan for',
      instruction: '$14.99',
      posttext: '.',
      timer: 10,
      onComplete: function() {
        this.nextStep(false, 'money');
      },
    },
    {
      pretext: <span>Quickly bike back to the <b>kitchen</b> using the arrow keys.<br/>KITCHEN&nbsp;&nbsp;&nbsp;&nbsp;LIBRARY&nbsp;&nbsp;&nbsp;&nbsp;STORE&nbsp;&nbsp;&nbsp;&nbsp;BANK<br/></span>,
      instruction: '<bike>',
      type: 'dial',
      startValue: 22,
      timer: 10,
      onTimeout: function(value) {
        if (value <= 4) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Put the saucepan on the stove, and set it to <b className="fireRed">HIGH</b> heat.<br/>OFF LOW - - MED - - HIGH - - - - AHHHHHH<br/></span>,
      instruction: '^',
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 20 && value <= 24) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Grab the <b>vanilla bean</b> from the cupboard.</span>,
      type: 'ingredients',
      leftName: 'Selection',
      rightName: 'Cupboard',
      ingredients: [
        {name: 'vanilla cake', key: 'c', left: false},
        {name: 'vanilla bean', key: 'b', left: false},
        {name: 'vanilla extract', key: 'e', left: false},
        {name: 'vanilla ice', key: 'i', left: false},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'vanilla bean') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Grab the',
      instruction: 'cream',
      posttext: 'from the refrigerator.',
      timer: 8,
    },
    {
      pretext: <span>Mash 'x' to mix the cream and vanilla together.<br/></span>,
      instruction: 'x',
      type: 'mash',
      mashCount: 10,
      timer: 7,
    },
    {
      instruction: 'Stir',
      posttext: 'the vanilla and cream into the saucepan.',
      timer: 8,
    },
    {
      pretext: <span>Turn <b>off</b> the stove and remove the saucepan from the heat.<br/>OFF LOW - - MED - - HIGH - - - - AHHHHHH<br/></span>,
      instruction: '^',
      type: 'dial',
      startValue: 21,
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
      pretext: 'Grab a',
      instruction: 'medium bowl',
      posttext: 'from the pantry.',
      timer: 8,
    },
    {
      pretext: <span>Pour <b>1/2 cup</b> of sugar into a measuring cup.<br/></span>,
      instruction: 'suuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuggggaaaaarrrrrrrrrr',
      posttext: <span><br/>cups:&nbsp;&nbsp;&nbsp;&nbsp;^ 1/6&nbsp;&nbsp;&nbsp;&nbsp;^ 2/6&nbsp;&nbsp;&nbsp;&nbsp;^ 3/6&nbsp;&nbsp;&nbsp;&nbsp;^ 4/6&nbsp;&nbsp;&nbsp;&nbsp;^ 5/6&nbsp;&nbsp;&nbsp;&nbsp;^ 6/6</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 26 && progress <= 30) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Put <b>all your eggs</b> in one basket.</span>,
      type: 'ingredients',
      leftName: 'Carton',
      rightName: 'Basket',
      ingredients: [
        {name: 'egg', key: 'b', left: true},
        {name: 'egg', key: 'a', left: true},
        {name: 'egg', key: 's', left: true},
        {name: 'egg', key: 'k', left: true},
        {name: 'egg', key: 'e', left: true},
        {name: 'egg', key: 't', left: true},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.right.length === 6) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },

    {
      pretext: <span>Crack open 6 large eggs.<br/></span>,
      instruction: 'egg egg egg egg egg egg',
      timer: 15,
      onProgress: function(value) {
        if (value % 4 === 0) {
          Audio.playSE('eggcrack');
        }
        return value;
      },
    },
    {
      pretext: <span>Use the arrow keys to whisk the sugar and eggs together.<br/></span>,
      instruction: 'lurdlurdlurdlurd',
      type: 'arrows',
      timer: 10,
      onPressSound: ['eggbeat1', 'eggbeat2'],
    },
    {
      pretext: <span>Add the cream to the mixture <b>a little at a time</b>, stirring slowly.<br/></span>,
      type: 'mash',
      instruction: 'c',
      mashCount: 6,
      timer: 20,
    },
    {
      pretext: <span>Grab three <b>ramekins</b> from the pantry.</span>,
      type: 'ingredients',
      leftName: 'Selection',
      rightName: 'Pantry',
      ingredients: [
        {name: 'ramekin', key: 'r', left: false},
        {name: 'ramekin', key: 'k', left: false},
        {name: 'not a ramekin', key: 'n', left: false},
        {name: 'ramekin', key: 'm', left: false},
        {name: 'also not a ramekin', key: 'a', left: false},
        {name: 'definitely not a ramekin', key: 'd', left: false},
      ],
      timer: 9,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 3 && recipeData.left[0].name === 'ramekin' && recipeData.left[1].name === 'ramekin' && recipeData.left[2].name === 'ramekin') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Pour the mixture into the three ramekins. Careful not to overfill!<br/></span>,
      instruction: 'poooooooooooooooooooooooooouuuuuuuuuuuuuuurrrrrrrrr',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;^ not enough&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;^ too much&nbsp;&nbsp;&nbsp;&nbsp;</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 19 && progress <= 22) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Place the ramekins into a',
      instruction: 'large cake pan',
      posttext: '.',
      timer: 10,
    },
    {
      pretext: <span>Pour boiling water into the pan until it fills <b>halfway</b>.<br/></span>,
      instruction: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwater',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 1/4&nbsp;&nbsp;&nbsp;&nbsp;^ 2/4&nbsp;&nbsp;&nbsp;&nbsp;^ 3/4</span>,
      timer: 9,
      onComplete: () => {},
      onHoldSound: 'pouring',
      onTimeout: function(progress) {
        if (progress >= 16 && progress <= 21) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Using the arrow keys, put the pan in the oven.<br/></span>,
      instruction: '-|pan|-',
      type: 'dial',
      maxValue: 15,
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-oven-</span>,
      timer: 5,
      onTimeout: function(value) {
        if (value >= 10) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Sit back and wait for it to bake.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: 'While you\'re bored waiting, brush up on your pronunciation of',
      instruction: 'hors d\'oeuvre',
      posttext: '.',
      timer: 10,
      onComplete: function() {
        this.nextStep(false, 'horsdoeuvre');
      },
    },
    {
      pretext: <span>Name the brulees for your enjoyment.<br/></span>,
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
      pretext: () => <span>Take out <b>{recipeData.name}</b> and place them into the <b className="darkBlue">Super Power Freezer</b>.</span>,
      type: 'ingredients',
      leftName: 'Tray',
      rightName: 'Super Power Freezer',
      ingredients: [
        {name: 'ramekins', key: 'r', left: true},
      ],
      timer: 5,
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
      pretext: 'Wait a bit for it to freeze; then take it out to',
      instruction: 'thaw',
      posttext: <span>.<br/><br/>&nbsp;&nbsp;&nbsp;<ColorChange toColor="#659cf3">&#9679;</ColorChange> frozen</span>,
      timer: 20,
      onComplete: function(progress, time) {
        if (time <= 10) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Bring out <b>brown sugar</b> from the cupboard.</span>,
      type: 'ingredients',
      leftName: 'Hand',
      rightName: 'Cupboard',
      ingredients: [
        {name: 'white sugar', key: 'w', left: false},
        {name: 'yellow sugar', key: 'y', left: false},
        {name: 'brown sugar', key: 'b', left: false},
        {name: 'race-agnostic sugar', key: 'r', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'brown sugar') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      instruction: 'Spread',
      posttext: 'the brown sugar across the dessert.',
      timer: 10,
    },
    {
      pretext: 'Grab a',
      instruction: 'blowtorch',
      posttext: '(how exciting!)',
      timer: 10,
    },
    {
      pretext: <span>Plug the torch into the wall using the arrow keys.<br/><br/>|OUTLET|</span>,
      instruction: '<=plug=',
      type: 'dial',
      startValue: 7,
      onTimeout: function(value) {
        if (value <= 2) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
      timer: 10,
    },
    {
      pretext: <span>Tap <b>CAPS-LOCK</b> to turn on the blowtorch.<br/></span>,
      instruction: 'CAPSLOCK',
      type: 'mash',
      mashCount: 1,
      timer: 8,
    },
    {
      pretext: <span>Melt the sugar by passing the fire <b className="darkBlue">above the creme brulees</b>. Hope to god you don't start another fire.<br/><br/></span>,
      instruction: '=FIRE>',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\cb1/&nbsp;&nbsp;&nbsp;&nbsp;\cb2/&nbsp;&nbsp;&nbsp;&nbsp;\cb3/&nbsp;&nbsp;&nbsp;&nbsp;done&nbsp;&nbsp;&nbsp;&nbsp;too far&nbsp;&nbsp;&nbsp;&nbsp;PLEASE STOP</span>,
      type: 'dial',
      timer: 10,
      onTimeout: function(value) {
        if (value >= 22 && value <= 26) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Turn off the blowtorch and breathe a sigh of relief.<br/></span>,
      instruction: 'CAPSLOCK',
      type: 'mash',
      mashCount: 1,
      timer: 7,
    },
  ],
};

module.exports = CremeBrulee;
