/**
 * MTGNode Deck Builder Cards Panel Component
 * ===========================================
 *
 * Component displaying the matched cards.
 */
var React = require('react'),
    {Well} = require('react-bootstrap');

module.exports = React.createClass({
  render: function () {
    return (
      <Well className='cards-panel full-height'>
        Cards
      </Well>
    );
  }
});
