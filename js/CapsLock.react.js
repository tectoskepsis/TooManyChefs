var React = require('react');
var CapsLock = require('./CapsLock.min.js');

var CapsLockWarning = React.createClass({
  getInitialState: function() {
    return {
      on: false,
    };
  },

  componentDidMount: function() {
    this.setState({on: CapsLock.isOn()});

    CapsLock.addListener((status) => this.setState({on: status}));
  },

  render: function() {
    if (!this.state.on) {
      return null;
    }

    return (
      <div className="capslock alert alert-danger">
        <span className="glyphicon glyphicon-alert" /> CAPS-LOCK
      </div>
    );
  },
});

module.exports = CapsLockWarning;
