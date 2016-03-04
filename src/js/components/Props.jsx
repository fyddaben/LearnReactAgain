var React = require('react');

// 组件可以接受HTML属性值
var Props = React.createClass({
  render: function() {
    return (
      <h2>
        Hello, {this.props.name}
      </h2>
    )
  }
});

module.exports = Props;
