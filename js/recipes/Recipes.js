module.exports = [
  {
    name: 'American Diner',
    key: 'amer-diner',
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
    key: 'amer-brunch',
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
    key: 'asia-lunch',
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
    key: 'frit-bistro',
    locked: true,
    rating: 5,
    recipes: [
      // TODO: get rid of oatmeal
      //require('./Bruschetta.js'),
      require('./Oatmeal.js'),
      require('./ChickenMarsala.js'),
      require('./Oatmeal.js'),
      //require('./Bouillabaisse.js'),
      require('./CremeBrulee.js'),
    ],
  },
];
