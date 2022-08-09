var React = require('react');

var Audio = require('../Audio.js');

var nextStep = function() {
  return this.nextStep();
};

var Capslock = {
  name: 'Capslock',
  chefName: 'Pâtissier',
  type: 'dessert',
  difficulty: 'hard',
  ingredients: ['capslock'],
  description: 'CAPSLOCK',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Type a capital</span>,
      instruction: 'S',
      timer: 7,
    },
  ],
};

module.exports = Capslock;
