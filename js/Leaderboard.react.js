var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var cx = require('classnames')

var Firebase = require('./FirebaseConfig.js');
var KeyboardMixin = require('./KeyboardMixin.react.js');

var Leaderboard = React.createClass({
  mixins: [KeyboardMixin],
  propTypes: {
    meal: React.PropTypes.object.isRequired,
    singlePlayer: React.PropTypes.bool.isRequired,
    numTop: React.PropTypes.number.isRequired,
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
        this.setState({
          leaderboard: leaderboard,
          selectedRow: 0,
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
            {leaderboard.map((stat, i) =>
              <tr key={'stat' + i} ref={i === this.state.selectedRow ? 'selected' : null}>
                <th>{i + 1}</th>
                <td>{stat.name}</td>
                <td>{isCount ? stat.bestTime : Leaderboard.renderTime(stat.bestTime)}</td>
              </tr>
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
