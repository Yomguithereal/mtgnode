/**
 * MTGNode Unknown Route Component
 * ================================
 *
 * Component in case of wrong route.
 */
var React = require('react'),
    Jumbotron = require('react-bootstrap/Jumbotron')

module.exports = React.createClass({
  render: function() {
    return (
      <Jumbotron>
        <h1>You have gone too far this time...</h1>
        <p>Maybe you should go back to something more of your comfort zone?</p>
      </Jumbotron>
    );
  }
});
