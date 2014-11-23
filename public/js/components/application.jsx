/**
 * MTGNode Application Component
 * ==============================
 *
 * Top-level component dealing with the app's hierarchy.
 */
var React = require('react'),
    RouteHandler = require('react-router').RouteHandler;

module.exports = React.createClass({
  render: function() {
    return (
      <div id="container">
        <RouteHandler />
      </div>
    );
  }
});
