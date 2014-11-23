/**
 * MTGNode Application Starting Script
 * ====================================
 *
 * Script building assets and starting the express application.
 */
var config = require('../config.json'),
    app = require('../api/app.js'),
    build = require('./build.js'),
    realtime = require('../api/realtime.js'),
    async = require('async'),
    server;

async.series({
  build: function(next) {
    console.log('Building files...');
    build(next);
  },
  server: function(next) {
    console.log('Listening to port ' + config.port + '...');
    server = app.listen(config.port);
    next();
  },
  realtime: function(next) {
    console.log('Launching socket server...');
    realtime(server);
    next();
  }
}, function(err) {
  if (err) throw err;
  console.log('Everything is ready to go!\n');
});
