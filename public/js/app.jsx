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
    Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    Application = require('./components/application.jsx'),
    Login = require('./components/login/login.jsx'),
    Lobby = require('./components/lobby/lobby.jsx'),
    Unknown = require('./components/unknown.jsx'),
    $ = require('jquery');

// Handling session
if (SESSION.name)
  controller.update('user', SESSION);

// Fetching user list
controller.request('retrieveUsers');

// Routing
var routes = (
  <Route name="app" path="/" handler={Application}>
    <DefaultRoute handler={Lobby} />
    <Route name="login" handler={Login} />
    <Route name="lobby" handler={Lobby} />
    <NotFoundRoute handler={Unknown} />
  </Route>
);

// Mounting
Router.run(routes, function(Handler) {
  React.render(<Handler />, $('#application')[0]);
});

// Exporting
module.exports = {
  control: controller
};
