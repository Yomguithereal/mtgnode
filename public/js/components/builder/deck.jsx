/**
 * MTGNode Deck Builder Deck Panel Component
 * ==========================================
 *
 * Component displaying the current deck that the user is building.
 */
var React = require('react'),
    {Well} = require('react-bootstrap');

module.exports = React.createClass({
  render: function () {
    return (
      <Well className='deck-panel full-height'>
        Deck
      </Well>
    );
  }
});
