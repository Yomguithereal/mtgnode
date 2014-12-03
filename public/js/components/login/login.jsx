/**
 * MTGNode Login Picker
 * =====================
 *
 * This simple component enables the visitor to pick its user.
 */
var React = require('React'),
    controller = require('../../controllers/main.js'),
    {Grid, Row, Col, Well, Button} = require('react-bootstrap');

// User Button
var UserButton = React.createClass({
  handleClick: function() {
    controller.emit('login:attempt', {name: this.props.name});
  },
  render: function() {
    var name = this.props.name;

    return (
      <li>
        <Button onClick={this.handleClick} bsStyle="default">{name}</Button>
      </li>
    );
  }
});

// Picker
var Picker = React.createClass({
  mixins: [controller.mixin],
  cursor: ['data', 'users'],
  renderButton: function(user) {
    return <UserButton key={user} name={user} />;
  },
  render: function() {
    var users = this.cursor.get();

    return (
      <Well className="login-picker">
        <ul>
          {users.map(this.renderButton)}
        </ul>
      </Well>
    );
  }
});

// Main Component
module.exports = React.createClass({
  render: function() {
    return (
      <Grid>
        <Row>
          <Col md={4} />
          <Col md={4}>
            <Picker />
          </Col>
          <Col md={4} />
        </Row>
      </Grid>
    );
  }
});
