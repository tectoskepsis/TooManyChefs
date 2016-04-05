module.exports = [
  {
    name: 'American Diner',
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
    rating: 3,
    recipes: [
      require('./FruitCeviche.js'),
      require('./CrabCakes.js'),
      require('./EggsBenedict.js'),
      require('./BelgianWaffle.js'),
    ],
  },
  {
    name: 'Pan-Asian Lunch',
    rating: 4,
    recipes: [
      require('./SpringRolls.js'),
      require('./FishCurry.js'),
      require('./FriedRice.js'),
      require('./Cheesecake.js'),
    ],
  },
  {
    name: 'French-Italian Bistro',
    locked: true,
    rating: 5,
    recipes: [
      require('./Bruschetta.js'),
      require('./ChickenMarsala.js'),
      require('./FrenchOnionSoup.js'),
      require('./CremeBrulee.js'),
    ],
  },
];
