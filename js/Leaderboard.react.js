var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var cx = require('classnames')

var Firebase = require('./FirebaseConfig.js');
var KeyboardMixin = require('./KeyboardMixin.react.js');

function matchCase(word, wordToMatch) {
  return _.map(word, (char, i) => {
    var character = wordToMatch.charAt(i);
    var isUpper = character == character.toUpperCase();
    return isUpper ? char.toUpperCase() : char.toLowerCase();
  })
}

var PROFANITIES = {
  fuck: 'fork',
  penis: 'pan',
  dick: 'duck',
  bitch: 'birch',
  shit: 'chip',
};


var Leaderboard = React.createClass({
  mixins: [KeyboardMixin],
  propTypes: {
    meal: React.PropTypes.object.isRequired,
    singlePlayer: React.PropTypes.bool.isRequired,
    numTop: React.PropTypes.number.isRequired,
    leaderboardName: React.PropTypes.string,
  },

  statics: {
    renderTime: function(time) {
      if (!_.isNumber(time)) {
        return time;
      }
      var min = (time / 60) << 0; // floor
      var sec = (time % 60) << 0; // floor
      var ms = time.toFixed(3).split('.')[1];
      return [
        _.padStart(min, 2, '0'),
        ':',
        _.padStart(sec, 2, '0'),
        '.',
        _.padStart(ms, 3, '0'),
      ].join('');
    },
  },

  getInitialState: function() {
    return {
      leaderboard: null,
      selectedRow: 0,
      scrolledToBottom: false,
    };
  },

  componentDidMount: function() {
    this.refreshLeaderboard(this.props);
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.props.meal !== nextProps.meal) {
      this.refreshLeaderboard(nextProps);
    }
  },

  componentWillUnmount: function() {
    if (this._query) {
      this._query.off();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.selectedRow !== prevState.selectedRow && this.refs.selected) {
      var node = ReactDOM.findDOMNode(this.refs.selected);
      if (node && node.scrollIntoView) {
        node.scrollIntoView();
      }
    }
  },

  refreshLeaderboard: function(props) {
    if (props.meal.tutorial) {
      this.setState({leaderboard: null});
      return;
    }

    var mode = props.singlePlayer ? 'solo/' : 'party/';
    var ref = Firebase.database().ref('leaderboard/' + mode + props.meal.key);
    var isCount = props.meal.record === 'count';
    // Find top scores depending on count (e.g. mashed potatoes) or time.
    this._query = isCount
      // HACK: grab more so we can filter out dupes.
      ? ref.limitToLast(this.props.numTop * 2)
      : ref.limitToFirst(this.props.numTop * 2)
    if (this._query) {
      this._query.once('value', (snapshot) => {
        var val = snapshot.val();
        // Remove duplicate names, sort, and then truncate to numTop.
        var leaderboard = _.uniqBy(
            _.isArray(val) ? val : _.toArray(val), (e) => e.name);
        leaderboard = _.take(
            _.sortBy(leaderboard, isCount ? e => -e.bestTime : 'bestTime'),
            this.props.numTop);
        var numStats = leaderboard.length;
        // Fill extra spaces with placeholders
        if (numStats < this.props.numTop) {
          leaderboard = _.concat(leaderboard, new Array(this.props.numTop - numStats));
          _.fill(leaderboard, {name: '---', bestTime: '---'}, numStats);
        }

        // Find the chef, if they're on the leaderboard!
        var chefRow = _.findIndex(
            leaderboard, (stat) => this.props.leaderboardName === stat.name);
        this.setState({
          leaderboard: leaderboard,
          selectedRow: chefRow >= 0 ? Math.max(0, chefRow - 5) : 0,
        });
      });
    }
  },

  render: function() {
    if (!this.state || this.props.meal.tutorial || !this.state.leaderboard) {
      return null; // don't render if no leaderboard
    }

    // Array of {name: "", bestTime: number}
    var leaderboard = this.state.leaderboard;
    var isCount = this.props.meal.record === 'count';
    var recordText = isCount ? 'Score' : 'Time';

    return (
      <div className="mealInfo">
        <h4>Leaderboard</h4>
        <table className="table leaderboard table-condensed" onScroll={this.handleScroll}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>{recordText}</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((stat, i) => {
              var isMe = this.props.leaderboardName === stat.name;
              var statName = stat.name;
              var censored = [];
              // Censor the profanities!
              _.forEach(PROFANITIES, (replacement, profanity) => {
                var separated = statName.split(new RegExp(profanity, 'i'));
                if (separated.length > 1) {
                  var fucksGiven =
                    _.toArray(statName.matchAll(new RegExp(profanity, 'ig')))
                    .map((match) => ({
                      profanity: match[0],
                      index: match.index,
                    }));
                  censored.push(...fucksGiven.map(({profanity, index}, i) => (
                    <span key={`${stat.name}-${replacement}-${i}`}
                          className="fireRed censored"
                          style={{left: `${index * 0.6 + 0.4}em`}}>
                        {matchCase(replacement, profanity)}
                    </span>
                  )));
                }
              });

              return (
                <tr key={'stat' + i}
                    className={cx({selected: isMe})}
                    ref={i === this.state.selectedRow ? 'selected' : null}>
                  <th>
                    {isMe && <img width="20" height="20" src="images/chefhat.png" alt="" />}
                    {' '}{i + 1}
                  </th>
                  <td className="name">{stat.name}{censored}</td>
                  <td>{isCount ? stat.bestTime : Leaderboard.renderTime(stat.bestTime)}</td>
                </tr>
              )}
             )}
          </tbody>
        </table>
        <div className={cx('glyphicon glyphicon-triangle-bottom', {disabled: this.state.scrolledToBottom})} />
      </div>
    );
  },

  onKeyDown: function(e) {
    var keyCode = e.which || e.keyCode || 0;
    if (keyCode === 38) {  // up
      this.setState({selectedRow: Math.max(0, this.state.selectedRow - 1)})
    } else if (keyCode === 40) { // down
      var leaderboard = this.state.leaderboard || [];
      this.setState({
        // There's always about 10 rows visible, so don't let it select past the max.
        selectedRow: Math.min(leaderboard.length - 10, this.state.selectedRow + 1),
      })
    }
  },

  handleScroll: function(e) {
    var bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    this.setState({scrolledToBottom: bottom});
  },
});

module.exports = Leaderboard;
