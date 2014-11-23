/**
 * MTGNode Application Building Script
 * ====================================
 *
 * Script creating the browserify bundle and watching the files for changes.
 */
var browserify = require('browserify'),
    react = require('reactify'),
    source = require('vinyl-source-stream'),
    es6 = require('es6ify'),
    watchify = require('watchify'),
    gulp = require('gulp'),
    chalk = require('chalk');

// Creating bundle
module.exports = function(callback) {
  var bundler = browserify({
    entries: [__dirname + '/../public/js/app.js'],
    debug: true,
    transform: [es6, react],
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  var watcher = watchify(bundler);

  function build(firstTime) {

    if (!firstTime)
      console.log(chalk.cyan('Updating') + ' bundle...');
    watcher.bundle()
      .pipe(source('app.bundle.js'))
      .pipe(gulp.dest(__dirname + '/../public/build'))
      .on('end', function() {
        if (firstTime)
          callback();
        else
          console.log('Bundle ' + chalk.green('updated.'));
      });
  }

  // Watching
  watcher.on('update', function() {
    build();
  });

  // Building first time
  build(true);
};
