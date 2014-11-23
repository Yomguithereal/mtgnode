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
    chalk = require('chalk'),
    server;

async.series({
  build: function(next) {
    console.log(chalk.cyan('Building') + ' files...');
    build(next);
  },
  server: function(next) {
    console.log('Listening to port ' + chalk.yellow(config.port) + '...');
    server = app.listen(config.port);
    next();
  },
  realtime: function(next) {
    console.log('Launching ' + chalk.blue('socket') + ' server...');
    realtime(server);
    next();
  }
}, function(err) {
  if (err) throw err;
  console.log('Everything is ' + chalk.green('ready') + ' to go!\n');
});
