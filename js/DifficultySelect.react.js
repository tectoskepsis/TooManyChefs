var React = require('react');

var _ = require('lodash');
var cx = require('classnames');

var Recipes = require('./recipes/Recipes.js');

var DifficultySelect = React.createClass({
  propTypes: {
    onProgress: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      value: 0,
    };
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.onKeyDown);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.onKeyDown);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onProgress(this.state.value);
    }
  },

  onKeyDown: function(e) {
    var keyCode = e.which || e.keyCode || 0;
    if (keyCode === 37 && this.state.value > 0) {
      // left arrow pressed
      this.setState({value: this.state.value - 1});
    } else if (keyCode === 39 && this.state.value < Recipes.length - 1) {
      // right arrow pressed
      this.setState({value: this.state.value + 1});
    }
  },

  // TODO: render dots, arrows, each recipe
  render: function() {
    var meal = Recipes[this.state.value];
    var emptyStar = (i) => <span key={i} className="glyphicon glyphicon-star-empty" />;
    var fullStar = (i) => <span key={i} className="glyphicon glyphicon-star" />;

    return (
      <div>
        <p>
          Difficulty: {_.range(5).map((i) => i < meal.difficulty ? fullStar(i) : emptyStar(i))}
        </p>

        {meal.recipes.map((r, i) => (
          <div key={i}>{r.name} ({r.type})</div>
        ))}
        <br/>

        <div className="padTop">
          <span className="glyphicon glyphicon-triangle-left" />
          {_.range(Recipes.length).map((i) =>
             <span key={i} className={cx('dot', {active: this.state.value === i})} />)}
          <span className="glyphicon glyphicon-triangle-right" />
        </div>
      </div>
    );
  },
});

module.exports = DifficultySelect;
