var React = require('react');

var recipeData = {
    name: 'macedonia',
    left: [],
    right: [],
}

var Macedonia = {
    name: 'Macedonia',
    chefName: 'Commis',
    type: 'dessert',
    difficulty: 'medium',
    ingredients: ['1 pineapple', '2 cup strawberries', '3 apples', '1 cup grapes', '2 mandarin oranges', '2 kiwis', '1/2 cup lemon juice', '1 tsp vanilla extract'],
    description: 'A fresh and summery fruit salad to cool you down.',

    /* A recipe is a list of json steps */
    steps: [
        {
            pretext: <span>Grab a <b>large cutting board</b> and put it on the table.</span>,
            type: 'ingredients',
            leftName: 'Counter',
            rightName: 'Boards',
            ingredients: [
                    {name: 'small cutting board', key: 's', left: false, sound: 'cupboard'},
                    {name: 'cutting board', key: 'c', left: false, sound: 'cupboard'},
                    {name: 'large cutting board', key: 'l', left: false, sound: 'cupboard'},
                ],
            timer: 10,
            onProgress: function(left, right) {
                recipeData.left = left;
                recipeData.right = right;
            },
            onTimeout: function() {
                if (recipeData.left.length === 1 && recipeData.left[0].key === 'l') {
                    this.nextStep();
                } else {
                    this.failure();
                }
            },
        },
        {
            pretext: <span>Grab a <b>chef's knife</b> from the knife drawer.</span>,
            type: 'ingredients',
            leftName: 'Counter',
            rightName: 'Knives',
            ingredients: [
                {name: 'large cutting board', key: 'l', left: true, sound: 'cupboard'},
                {name: 'chef\'s knife', key: 'c', left: false, sound: 'cutlery2'},
                {name: 'paring knife', key: 'p', left: false, sound: 'cutlery2'},
                {name: 'fillet knife', key: 'f', left: false, sound: 'cutlery2'},
                {name: 'bread knife', key: 'b', left: false, sound: 'cutlery2'},
            ],
            timer: 11,
            onProgress: function(left, right) {
                recipeData.left = left;
                recipeData.right = right;
            },
            onTimeout: function() {
                if (recipeData.left.length === 2 && recipeData.left.every((item) => {return item.key === 'l' || item.key === 'c';})) {
                    this.nextStep();
                } else {
                    this.failure();
                }
            },
        },
        {
            pretext: <span>Cut off the <b className="green">green top</b> of the pineapple.<br/></span>,
            instruction: 'V',
            posttext: <span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="green">P I N</span> <span className="goldenBrown">E A P P L E</span></span>,
            type: 'dial',
            onTimeout: function(value) {
                if (value >= 10 && value <= 12) {
                  this.nextStep();
                } else {
                  this.failure();
                }
              },
            timer: 10,
        },
        {
            pretext: 'Now',
            instruction: 'core',
            posttext: 'out the pineapple.',
            timer: 9,
        },
    ],
};

module.exports = Macedonia;