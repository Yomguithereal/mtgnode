/**
 * MTGNode Deck Builder
 * =====================
 *
 * This component renders the deck builder interface.
 */
var React = require('react'),
    {Grid, Row, Col} = require('react-bootstrap'),
    Controls = require('./controls.jsx'),
    Cards = require('./cards.jsx'),
    Deck = require('./deck.jsx'),
    controller = require('../../controllers/main.js');

module.exports = React.createClass({
  componentWillMount: function() {
    controller.emit('sets:retrieve');
  },
  render: function() {
    return (
      <Grid id='deck-builder'>
        <Row>
          <Col md={3}>
            <Controls></Controls>
          </Col>
          <Col md={5}>
            <Cards></Cards>
          </Col>
          <Col md={4}>
            <Deck></Deck>
          </Col>
        </Row>
      </Grid>
    );
  },
  statics: {
    willTransitionTo: function(transition) {
      if (!controller.get('user'))
        return transition.redirect('/login');
    }
  }
});

