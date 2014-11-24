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

    return <Button onClick={this.handleClick} bsStyle="default">{name}</Button>;
  }
});

// Picker
var Picker = React.createClass({
  mixins: [controller.mixin],
  renderOn: 'users:updated',
  renderButton: function(user) {
    return <UserButton key={user} name={user} />
  },
  render: function() {
    return (
      <Well className="login-picker">
        {this.control.get('users').map(this.renderButton)}
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
