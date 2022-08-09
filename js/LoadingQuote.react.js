var React = require('react');

var _sample = require('lodash/sample');

const LOADING_QUOTES = [
  {quote: <span><span className="fireRed">Too many cooks</span> spoil the broth.</span>, source: 'Proverb'},
  {quote: <span>It takes a lot to make a stew.</span>, source: 'Too Many Cooks'},
  {quote: <span><span className="goldenBrown">Well done</span> is better than well said, except for steaks, which should always be<br/><span className="fireRed">medium-rare</span>.</span>, source: 'Benjamin Franklin'},
  {quote: <span>A kitchen <span className="fireRed">divided</span> against itself<br/>cannot stand.</span>, source: 'Abraham Lincoln'},
  {quote: <span>Human behavior flows from three main sources: desire, emotion, and <span className="goldenBrown">cooking</span>.</span>, source: 'Plato'},
  {quote: <span>At his best, man is the noblest of all animals; <span className="fireRed">separated from cuisine</span> he is the worst.</span>, source: 'Aristotle'},
  {quote: <span>One chef, two chef.<br/><span className="fireRed">Red chef</span>, <span className="darkBlue">blue chef</span>.</span>, source: 'Dr. Seuss'},
  {quote: <span>To improve is <span className="darkBlue">to cook</span>;<br/>to be perfect is <span className="green">to cook often</span>.</span>, source: 'Winston Churchill'},
  {quote: <span><span className="green">To cook</span> or <span className="darkBlue">not to cook</span>,<br/>that is the question.</span>, source: 'Hamlet, William Shakespeare'},
  {quote: <span><span className="goldenBrown">Perfect steaks</span>, like perfect men,<br/>are <span className="fireRed">very rare</span>.</span>, source: 'René Descartes'},
  {quote: <span>That which does not <span className="fireRed">poison</span> us<br/> makes us stronger.</span>, source: 'Friedrich Nietzsche'},
  {quote: <span><span className="goldenBrown">Cuisine</span> is the mediator between the spiritual and the sensual life.</span>, source: 'Ludwig van Beethoven'},
  {quote: <span>I pay no attention whatever to anybody's praise or blame. I simply <span className="green">follow my own recipe.</span></span>, source: 'Wolfgang Amadeus Mozart'},
  {quote: <span>There is no substitute for <span className="fireRed">good spices</span>.</span>, source: 'Thomas Edison'},
  {quote: <span>Associate with chefs of good quality if you esteem your own reputation; for it is better to <span className="darkBlue">be alone</span> than in <span className="fireRed">bad company</span>.</span>, source: 'George Washington'},
  {quote: <span>It's the recipe that's <span className="fireRed">never started</span> as takes <span className="green">longest to finish</span>.</span>, source: 'J. R. R. Tolkien'},
  {quote: <span><span className="darkBlue">You</span> must be the <span className="green">change</span> you wish<br/>to see in the kitchen.</span>, source: 'Mahatma Gandhi'},
  {quote: <span><span className="darkBlue">All my life</span> I've looked at ingredients as though I were seeing them for the first time.</span>, source: 'Ernest Hemingway'},
  {quote: <span><span className="darkBlue">Good chefs</span> copy;<br/><span className="green">great chefs</span> steal.</span>, source: 'Pablo Picasso'},
  {quote: <span>Be less curious about <span className="green">people</span><br/>and more curious about <span className="goldenBrown">food</span>.</span>, source: 'Marie Curie'},
  {quote: <span>Do not tell <span className="green">secret recipes</span> to those whose faith and silence you have not already tested.</span>, source: 'Queen Elizabeth I'},
  {quote: <span>A <span className="darkBlue">single grain of rice</span> can tip the scale.</span>, source: 'The Emperor of China, Mulan'},
  {quote: <span><span className="darkBlue">The oven.</span> It is a beautiful and terrible thing, and should therefore be treated with great caution.</span>, source: 'Albus Dumbledore, J. K. Rowling'},
  {quote: <span>Food is the only force capable of<br/>transforming an <span className="fireRed">enemy</span> into <span className="green">friend</span>.</span>, source: 'Martin Luther King, Jr.'},
  {quote: <span>She who succeeds in gaining the <span className="green">mastery of the dish</span> will gain the <span className="darkBlue">mastery of life</span>.</span>, source: 'Susan B. Anthony'},
  {quote: <span>I can calculate the motion of heavenly bodies, but not the <span className="fireRed">madness of cooks</span>.</span>, source: 'Isaac Newton'},
  {quote: <span><span className="darkBlue">Thoughts without content</span> are empty;<br/><span className="fireRed">dishes without spices</span> are blind.</span>, source: 'Immanuel Kant'},
  {quote: <span>Chefs of the world unite; you have<br/><span className="darkBlue">nothing to lose</span> but your <span className="fireRed">chains</span>.</span>, source: 'Karl Marx'},
  {quote: <span>The <span className="fireRed">strength</span> of a kitchen derives from<br/>the <span className="green">integrity</span> of its chefs.</span>, source: 'Confucius'},
  {quote: <span><span className="green">All that we are</span> is the result<br/>of what we have <span className="goldenBrown">cooked</span>.</span>, source: 'Buddha'},
  {quote: <span>The <span className="green">successful</span> chef is the average man, with laser-like focus.</span>, source: 'Bruce Lee'},
  {quote: <span>Ask not what <span className="darkBlue">your kitchen</span> can do for you,<br/>but what <span className="green">you</span> can do for your kitchen.</span>, source: 'John F. Kennedy'},
  {quote: <span><span className="goldenBrown">Cook</span> whenever possible.<br/>It is <span className="fireRed">always</span> possible.</span>, source: 'Dalai Lama'},
  {quote: <span>One may know how to cook<br/><span className="fireRed">without</span> being able to do it.</span>, source: 'Sun Tzu'},
];

var LoadingQuote = React.createClass({
  getInitialState: function() {
    return {
      quote: _sample(LOADING_QUOTES),
    };
  },

  render: function() {
    return (
      <div className="padTop vcenter vtop">
        <h3>Loading...</h3>
        <blockquote className="padTop">
          <p>{this.state.quote.quote}</p>
          <footer>{this.state.quote.source}</footer>
        </blockquote>
      </div>
    );
  },
});

module.exports = LoadingQuote;
