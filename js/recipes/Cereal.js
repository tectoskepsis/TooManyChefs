var React = require('react');

var recipeData = {
  name: 'Circley Oats',
  left: [],
  right: [],
};

var nextStep = function() {
  return this.nextStep();
};

/* Used for tutorial */
var Cereal = {
  name: 'Cereal',
  chefName: 'Apprenti',
  type: 'entrée',
  difficulty: 'easy',
  ingredients: ['cereal', 'milk', 'imagination'],
  description: 'A basic bowl of cereal.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Wait a few seconds to gather your thoughts...',
      timer: 10,
      onTimeout: nextStep,
    },
    {
      pretext: <span>Type to pick out your favorite cereal.<br/></span>,
      instruction: 'Cereal name: ',
      type: 'textinput',
      timer: 7,
      onTimeout: function(name) {
        if (!name) {
          this.failure();
        } else {
          recipeData.name = name.substr(0, 15); // max 15 letters
          this.nextStep();
        }
      },
    },
    {
    pretext: <span>Tap 'b' to take out a <b>bowl</b> from the cupboard.</span>,
      type: 'ingredients',
      leftName: 'Table',
      rightName: 'Cupboard',
      ingredients: [
        {name: 'bowl', key: 'b', left: false, sound: 'boop'},
        {name: 'plate', key: 'p', left: false, sound: 'boop'},
      ],
      timer: 10,
      onProgress: function(left, right) {
        recipeData.left = left;
        recipeData.right = right;
      },
      onTimeout: function() {
        if (recipeData.left.length === 1 && recipeData.left[0].name === 'bowl') {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: 'Type',
      instruction: 'check',
      posttext: 'to make sure your milk hasn\'t expired.',
      timer: 12,
    },
    {
      pretext: <div>Hold 'm' to pour <b className="green">1 cup</b> of milk into the bowl.<br/>(Stop at the correct <b>^</b> indicator!)<br/><br/></div>,
      instruction: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmilk',
      posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 1/2 cup&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 1 cup&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^ 3/2 cups</span>,
      timer: 10,
      onHoldSound: 'pouring',
      onComplete: () => {},
      onTimeout: function(progress) {
        if (progress >= 21 && progress <= 28) {
          this.nextStep();
        } else {
          this.failure();
        }
      },
    },
    {
      pretext: () => <span>Use the arrow keys to pour some <b className="green">{recipeData.name}</b> into the bowl.<br/></span>,
      instruction: 'dldldldl',
      type: 'arrows',
      timer: 10,
    },
    {
      pretext: <span>Mash 'c' <b className="darkBlue">5 times</b> to chomp down on the delicious cereal.<br/></span>,
      instruction: 'c',
      type: 'mash',
      mashCount: 5,
      timer: 10,
    },
  ],
};

module.exports = Cereal;
