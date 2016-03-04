
var React = require('react');
var names = [];
names.push('Alice');
names.push('Emily');
names.push('daben');
names.push('Kate');
// 代码块，用大括号隔开
var Map = React.createClass({

  render: function() {
    return (
      <div>
        {
          names.map(function(name) {
            return <div> Hello, {name}!</div>
          })
        }
      </div>
    );
  }
});

module.exports = Map;
