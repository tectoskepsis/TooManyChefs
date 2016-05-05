var Firebase = require('firebase');
var React = require('react');
var ReactFireMixin = require('reactfire');

var _ = require('lodash');

const FIREBASE_URI = 'https://toomanychefs.firebaseio.com/';

var Leaderboard = React.createClass({
  mixins: [ReactFireMixin],

  propTypes: {
    meal: React.PropTypes.object.isRequired,
    singlePlayer: React.PropTypes.bool.isRequired,
  },

  statics: {
    renderTime: function(time) {
      if (!_.isNumber(time)) {
        return time;
      }
      var min = (time / 60) << 0; // floor
      var sec = time % 60;
      return _.padStart(min, 2, '0') + ':' + _.padStart(sec, 2, '0');
    },
  },

  getInitialState: function() {
    return {
      leaderboard: null,
    };
  },

  componentWillMount: function() {
    var mode = this.props.singlePlayer ? 'solo' : 'party';
    this.bindAsObject(new Firebase(FIREBASE_URI + 'leaderboard/' + mode), 'leaderboard');
  },

  canRender: function() {
    return this.state && _.has(this.state.leaderboard, this.props.meal.key);
  },

  render: function() {
    if (!this.state) {
      return null; // might try to render before state appears?
    }

    // Array of {name: "", bestTime: number}
    var mealStats = _.get(this.state.leaderboard, this.props.meal.key, null);
    if (mealStats === null) {
      return null;
    }
    var numStats = mealStats.length;
    if (numStats < 5) {
      // Fill extra spaces with placeholders
      mealStats = _.concat(mealStats, new Array(5 - numStats));
      _.fill(mealStats, {name: '---', bestTime: '---'}, numStats);
    }
    var isCount = this.props.meal.record === 'count';
    var recordText = isCount ? 'Best Score' : 'Best Time';

    return (
      <div className="mealInfo">
        <h4>Leaderboard</h4>
        <table className="table leaderboard table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>{recordText}</th>
            </tr>
          </thead>
          <tbody>
            {mealStats.map((stat, i) =>
              <tr key={'stat' + i}>
                <th>{i + 1}</th>
                <td>{stat.name}</td>
                <td>{isCount ? stat.bestTime : Leaderboard.renderTime(stat.bestTime)}</td>
              </tr>
             )}
          </tbody>
        </table>
        <br/>
      </div>
    );
  },

});

module.exports = Leaderboard;
