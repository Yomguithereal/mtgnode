/**
 * MTGNode Client Application
 * ===========================
 *
 * Main client file intializing the whole application.
 */

// Dependencies
var controller = require('./controllers/main.js'),
    React = require('react'),
    Router = require('react-router'),
    routes = require('./routes.jsx');

// Fetching user list
controller.request('retrieveUsers');

// Mounting
Router.run(routes, function(Handler) {
  React.render(<Handler />, document.querySelector('#application'));
});

// Exporting
module.exports = {
  control: controller
};
