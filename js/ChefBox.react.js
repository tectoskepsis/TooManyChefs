var React = require('react');

var cx = require('classnames');

var ChefBox = React.createClass({
  propTypes: {
    chefId: React.PropTypes.number.isRequired,
    widthClass: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      widthClass: 6,
    };
  },

  render: function() {
    var classes = cx('chefBox', 'col-xs-12', 'col-sm-6',
      {[`col-md-${this.props.widthClass}`]: true}
    );

    return (
      <div className={classes}>
        <h5>Chef {this.props.chefId}</h5>
      </div>
    );
  },
});

module.exports = ChefBox;
