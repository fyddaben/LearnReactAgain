require('../../scss/mobile.scss');
var React = require('react');

var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({
      liked: ! this.state.liked
    });
  },
  render: function() {
    var text = this.state.liked ? 'liked': 'have\'t liked';
    return (
      <p onClick={this.handleClick}>
       daben {text} this. Click to toggle;
      </p>
    );
  }
});

module.exports = LikeButton;
