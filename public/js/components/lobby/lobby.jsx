/**
 * MTGNode Lobby Picker
 * =====================
 *
 * This component renders the games' list and the menu leading to other pages.
 */
var React = require('react'),
    {Grid, Row, Col} = require('react-bootstrap'),
    controller = require('../../controllers/main.js');

module.exports = React.createClass({
  render: function() {
    return (
      <Grid>
        <Row>
          <Col md={1} />
          <Col md={10}>
            Hello
          </Col>
          <Col md={1} />
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

