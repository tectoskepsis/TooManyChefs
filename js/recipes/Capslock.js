var React = require('react');

var Audio = require('../Audio.js');

var nextStep = function() {
  return this.nextStep();
};

var Cheesecake = {
  name: 'Capslock',
  chefName: 'Pâtissier',
  type: 'dessert',
  difficulty: 'hard',
  ingredients: ['capslock'],
  description: 'CAPSLOCK',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: <span>Tap CAPS-LOCK to turn on the oven light.<br/></span>,
      instruction: 'CAPSLOCK',
      type: 'mash',
      mashCount: 1,
      timer: 10,
    },
    {
      pretext: <span>Turn off the oven light and apologize profusely to the other chefs.<br/></span>,
      instruction: 'CAPSLOCK',
      type: 'mash',
      mashCount: 1,
      timer: 10,
    },
  ],
};

module.exports = Cheesecake;
