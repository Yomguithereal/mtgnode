/**
 * MTGNode Deck Builder Cards Panel Component
 * ===========================================
 *
 * Component displaying the matched cards.
 */
var React = require('react'),
    {Well} = require('react-bootstrap'),
    driver = require('../../drivers/mtgimage.js'),
    controller = require('../../controllers/main.js');

// Component displaying a single card
var Card = React.createClass({
  handleMouseOver: function() {
    console.log('ici');
    controller.emit('card:focus', this.props.card);
  },
  render: function() {
    var card = this.props.card;

    return (
      <span onMouseOver={this.handleMouseOver} className='search-card'>
        <img src={driver(card)} />
      </span>
    );
  }
});

module.exports = React.createClass({
  mixins: [controller.mixin],
  cursor: ['builder', 'cards'],
  renderCard: function(card) {
    return <Card key={card.multiverseid} card={card} />;
  },
  render: function () {
    return (
      <Well className='cards-panel full-height'>
        {this.cursor.get().map(this.renderCard)}
      </Well>
    );
  }
});
