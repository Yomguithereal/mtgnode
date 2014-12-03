/**
 * MTGNode Application Component
 * ==============================
 *
 * Top-level component dealing with the app's hierarchy.
 */
var React = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    {Navbar, Nav, NavItem} = require('react-bootstrap');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar bsStyle="default" className="main-nav">
          <Nav>
            <NavItem href="#/lobby">
              <b>MTGNode</b>
            </NavItem>
            <NavItem href="#/builder">
              Deck Builder
            </NavItem>
          </Nav>
        </Navbar>
        <div id="container">
          <RouteHandler />
        </div>
      </div>
    );
  }
});
