module.exports = [
  {
    name: 'American Diner',
    description: 'description blah blah American diner',
    rating: 2,
    recipes: [
      require('./Cornbread.js'),
      require('./BeefStroganoff.js'),
      require('./GreenBeanCasserole.js'),
      require('./ChocolateCupcakes.js'),
    ],
  },
  {
    name: 'Nice American Brunch',
    description: 'description blah blah American brunch',
    rating: 3,
    recipes: [
      require('./CrabCakes.js'),
      require('./EggsBenedict.js'),
      require('./FruitCeviche.js'),
      require('./BelgianWaffle.js'),
    ],
  },
  {
    name: 'Pan-Asian Lunch',
    description: 'blah blah Asian blend',
    rating: 4,
    recipes: [
      require('./SpringRolls.js'),
      require('./ChickenAdobo.js'),
      require('./FriedRice.js'),
      require('./Cheesecake.js'),
    ],
  },
  {
    name: 'French-Italian Bistro',
    description: 'high class blah blah stuff description here',
    rating: 5,
    recipes: [
      require('./Bruschetta.js'),
      require('./ChickenMarsala.js'),
      require('./FrenchOnionSoup.js'),
      require('./CremeBrulee.js'),
    ],
  },
];
