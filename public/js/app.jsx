/**
 * MTGNode Client Application
 * ===========================
 *
 * Main client file intializing the whole application.
 */

// Execution
require('./types.js');

// Dependencies
var domino = require('domino-js'),
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    Application = require('./components/application.jsx'),
    Login = require('./components/login/login.jsx'),
    Lobby = require('./components/lobby/lobby.jsx'),
    Unknown = require('./components/unknown.jsx'),
    $ = require('jquery');

// Intantiating the main controller
var controller = new domino({
  properties: {
    user: {
      type: '?User',
      value: null
    },
    users: {
      type: '?array',
      value: null
    }
  }
});

// Basics events
controller.on('route:update', function(e) {
  window.location.hash = e.data;
});

// Handling session
var initialSession = JSON.parse($('#session').val());

// if (!initialSession)
//   controller.request('users');

// Routing
var routes = (
  <Route name="app" path="/" handler={Application}>
    <Route name="login" handler={Login} />
    <Route name="lobby" handler={Lobby} />
    <NotFoundRoute handler={Unknown} />
  </Route>
);

// Mounting
Router.run(routes, function(Handler) {
  React.render(<Handler />, $('#application')[0]);
});
