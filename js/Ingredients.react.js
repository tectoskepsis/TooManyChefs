var React = require('react');
var TimerMixin = require('react-timer-mixin');

var Ingredients = React.createClass({
  mixins: [TimerMixin],

  propTypes: {
    //children: React.PropTypes.string.isRequired,
    leftName: React.PropTypes.string,
    rightName: React.PropTypes.string,
    ingredients: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      key: React.PropTypes.string.isRequired,
      left: React.PropTypes.bool.isRequired,
    })).isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      ingredients: this.props.ingredients,
    };
  },

  componentDidMount: function() {
    window.addEventListener('keypress', this.onKeyPress);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keypress', this.onKeyPress);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.onProgress) {
      var left = this.state.ingredients.filter((i) => i.left);
      var right = this.state.ingredients.filter((i) => !i.left);
      console.log(left);
      console.log(right);
      this.props.onProgress(left, right);
    }
  },

  onKeyPress: function(e) {
    var ingredients = this.state.ingredients;
    var keyCode = e.which || e.keyCode || 0;

    for (var i = 0; i < ingredients.length; i++) {
      if (keyCode === ingredients[i].key.charCodeAt(0)) {
        ingredients[i].left = !ingredients[i].left;
        this.setState({ingredients: ingredients});
        break;
      }
    }
  },

  render: function() {
    var left = this.state.ingredients.filter((i) => i.left);
    var right = this.state.ingredients.filter((i) => !i.left);

    return (
      <div className="padTop row">
        <div className="col-sm-6 col-xs-12">
          <h5>{this.props.leftName}</h5>
          <ul className="ingredients-step">
            {left.map((ing, i) =>
              <li key={i}><code><span className="input">[{ing.key}]</span> {ing.name}</code></li>
            )}
          </ul>
        </div>
        <div className="col-sm-6 col-xs-12">
          <h5>{this.props.rightName}</h5>
          <ul className="ingredients-step">
            {right.map((ing, i) =>
              <li key={i}><code><span className="input">[{ing.key}]</span> {ing.name}</code></li>
            )}
          </ul>
        </div>
      </div>
    );
  },
});

module.exports = Ingredients;
