var React = require('react');

var ColorChange = React.createClass({
  propTypes: {
    children: React.PropTypes.string.isRequired,
    fromColor: React.PropTypes.string,
    toColor: React.PropTypes.string,
    duration: React.PropTypes.number,
    onComplete: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      fromColor: '#ff0500',
      toColor: '#f5a018',
      duration: 15000, // in ms
    };
  },

  getInitialState: function() {
    return {
      value: this.props.mashCount,
    };
  },

  componentDidMount: function() {
    var options = {
      duration: this.props.duration,
    };
    if (this.props.onComplete) {
      options.callback = this.props.onComplete;
    }

    sweep(this.refs.elem.getDOMNode(), 'color', this.props.fromColor, this.props.toColor, options);
  },

  render: function() {
    return <span ref="elem">{this.props.children}</span>;
  },
});

module.exports = ColorChange;
