var React = require('react');

var RecipeStep = require('../RecipeStep.react.js');

var recipeData = {
  chickenName: '',
};

var FriedRice = {
  name: 'Chicken Fried Rice',
  difficulty: 'medium',
  ingredients: ['1 onion', '2 cups steamed rice', '2 eggs', '2 tbsp vegetable oil', '8 oz chicken breast', '1/2 cup carrots', 'soy sauce to taste'],
  description: 'A tasty balanced meal, perfect for getting rid of leftover rice.',

  /* A recipe is a list of json steps */
  steps: [
    {
      pretext: 'Grab a',
      instruction: 'cutting board',
      posttext: 'from the kitchen cabinet.',
      timer: 15,
    },
    {
      pretext: 'Equip a',
      instruction: 'knife',
      posttext: 'for +3 ATK vs vegetables.',
      timer: 15,
    },
    {
      pretext: <span>Dice up the carrots into little cubes.<br/></span>,
      instruction: 'dicedicedicedice',
      timer: 15,
    },
    {
      pretext: <span>Next, cut up the onions like they threatened your family.<br/></span>,
      instruction: 'chopchopchopchopchop',
      timer: 15,
    },
    {
      pretext: 'Take a few seconds to mourn the onions for their beautiful sacrifice.',
      timer: 10,
      onTimeout: 'nextStep',
    },
    {
      pretext: <span>Wipe away a single tear.<br/></span>,
      instruction: ':\'(',
      timer: 10,
    },
    {
      pretext: 'Excellent work! Onto the meat. Hmm... you forgot to defrost it, didn\'t you. Nuke the sucker in the microwave for',
      instruction: '60',
      posttext: 'seconds.',
      timer: 10,
    },
    {
      pretext: 'Wait, why did you do that? You can just press the',
      instruction: 'defrost',
      posttext: 'button.',
      timer: 10,
    },
    {
      pretext: 'Reflect on your sins while the chicken spins.',
      timer: 20,
      onTimeout: 'nextStep',
    },
    {
      pretext: <span>Take the chicken out and give it a name (press Enter when you're done).<br/></span>,
      textinput: 'Name:',
      timer: 10,
      onComplete: function(name) {
        recipeData.chickenName = name;
        this.nextStep();
      },
    },
    {
      pretext: () => <span>Cut {recipeData.chickenName} up into little pieces.<br/></span>,
      instruction: () => recipeData.chickenName,
      timer: 10,
      onComplete: function() {
        console.log(recipeData.chickenName);
        this.nextStep();
      },
    },
  ],
};

module.exports = FriedRice;
