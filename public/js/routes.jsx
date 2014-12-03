/**
 * MTGNode Route Registry
 * =======================
 *
 * Stating every possible routes for the application.
 */
var React = require('react'),
    {Route, NotFoundRoute, DefaultRoute} = require('react-router'),
    Application = require('./components/application.jsx'),
    Login = require('./components/login/login.jsx'),
    Lobby = require('./components/lobby/lobby.jsx'),
    Builder = require('./components/builder/builder.jsx'),
    Unknown = require('./components/unknown.jsx');

module.exports = (
  <Route name="app" path="/" handler={Application}>
    <DefaultRoute handler={Lobby} />
    <Route name="login" handler={Login} />
    <Route name="lobby" handler={Lobby} />
    <Route name="builder" handler={Builder}></Route>
    <NotFoundRoute handler={Unknown} />
  </Route>
);
