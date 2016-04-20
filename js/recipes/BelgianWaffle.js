var React = require('react');

var ColorChange = require('../ColorChange.react.js');
var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  name: 'waffley',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
}

var BelgianWaffle = {
  name: 'Belgian Waffle',
  chefName: 'Pâtissier',
  type: 'dessert',
  difficulty: 'easy',
  ingredients: ['1/4 oz dry yeast', '3 cups warm milk', '3 eggs', '3/4 cup butter', '1/2 cup white sugar', '1 1/2 tsp salt', '4 cups all-purpose flour'],
  description: 'Tender and flavorful, excellent with fresh fruit and cream.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Pour <b className="green">1/4</b> cup warm milk into a small bowl by holding 'm'.<br/></span>,
      instruction: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmilk',
      posttext: <span><br/>CUPS:&nbsp;&nbsp;&nbsp;&nbsp;^ 1/4&nbsp;&nbsp;&nbsp;&nbsp;^ 2/4&nbsp;&nbsp;&nbsp;&nbsp;^ 3/4&nbsp;&nbsp;&nbsp;&nbsp;^4/4</span>,
      timer: 10,
      onComplete: () => {},
      onHoldSound: 'pouring',
      onTimeout: function(progress) {
        if (progress >= 8 && progress <= 13) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Add the <b>yeast</b> to the bowl and let it dissolve.</span>,
      type: 'ingredients',
      leftName: 'Ingredients',
      rightName: 'Bowl',
      ingredients: [
        {name: 'yeast', key: 'y', left: true},
      ],
      timer: 10,
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
      pretext: 'In a second bowl, type',
      instruction: 'crack',
      posttext: 'to open some eggs.',
      timer: 10,
      onComplete: function() {
        this.nextStep(false, 'eggcrack');
      },
    },
    {
      pretext: <span>Separate the <b>yolk</b> from the <b>egg white</b>.</span>,
      type: 'ingredients',
      leftName: 'Left',
      rightName: 'Right',
      ingredients: [
        {name: 'egg white', key: 'w', left: true},
        {name: 'egg yolk', key: 'y', left: true},
      ],
      timer: 10,
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
      pretext: 'Equip a',
      instruction: 'whisk',
      posttext: 'for +1 mixing power.',
      timer: 8,
    },
    {
      pretext: <span>Mix together the egg yolk, milk, and butter by mashing 'm'.<br/></span>,
      instruction: 'm',
      type: 'mash',
      mashCount: 10,
      onPressSound: ['eggbeat1', 'eggbeat2'],
      timer: 10,
    },
    {
      pretext: <span>Stir in the yeast, sugar, salt, and vanilla with the arrow keys.<br/></span>,
      instruction: 'rdldrdl',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Pour in the remaining milk and flour, alternating.<br/></span>,
      instruction: 'mfmfmfmfmfmf',
      timer: 10,
    },
    {
      pretext: 'Type',
      instruction: 'fold',
      posttext: 'to combine the egg whites into the batter.',
      timer: 8,
    },
    {
      pretext: <span>Using the arrow keys, <b>cover</b> the bowl with plastic wrap.<br/></span>,
      instruction: '~~~~~~~~',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\_bowl_/</span>,
      type: 'dial',
      onTimeout: function(value) {
        if (value >= 6 && value <= 10) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
      timer: 9,
    },
    {
      pretext: 'Do some yoga while the yeast rises.',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Take out the <b>waffle iron</b> from the cabinet.</span>,
      type: 'ingredients',
      leftName: 'Weapon',
      rightName: 'Cabinet',
      ingredients: [
        {name: 'steam iron', key: 's', left: false},
        {name: 'golf iron', key: 'g', left: false},
        {name: 'waffle iron', key: 'w', left: false},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'waffle iron') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: <span>Pour some of the mixture into the iron by holding 'p' (but not too much).<br/></span>,
      instruction: 'pppppppppppppppppppppppppppppppppppppppour',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too little&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ just right&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ too much</span>,
      timer: 10,
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 20 && progress <= 30) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Now,',
      instruction: 'close',
      posttext: 'the lid and let it steam.',
      timer: 10,
    },
    {
      pretext: 'Wait for the waffle iron light to turn green; then',
      instruction: 'flip',
      posttext: <span>it over.<br/><br/>&nbsp;&nbsp;&nbsp;<ColorChange toColor="#5cb85c">&#9679;</ColorChange> ready to flip</span>,
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
      pretext: <span>Name your waffle as you wait for it to cook.<br/></span>,
      instruction: 'Name: ',
      type: 'textinput',
      timer: 8,
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
      pretext: <span>Take out the <b>whipped cream</b>.</span>,
      type: 'ingredients',
      leftName: 'Cream',
      rightName: 'Pantry',
      ingredients: [
        {name: 'ice cream', key: 'i', left: false},
        {name: 'buttercream', key: 'b', left: false},
        {name: 'shaving cream', key: 's', left: false},
        {name: 'whipped cream', key: 'w', left: false},
      ],
      timer: 8,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'whipped cream') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Take',
      instruction: 'out',
      posttext: 'the waffle from the iron.',
      timer: 8,
    },
    {
      pretext: () => <span>Top {recipeData.name} with whipped cream by typing</span>,
      instruction: 't',
      posttext: '.',
      timer: 7,
    },
  ],
};

module.exports = BelgianWaffle;
