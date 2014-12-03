/**
 * MTGNode Application Building Script
 * ====================================
 *
 * Script creating the browserify bundle and watching the files for changes.
 */
var browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    es6ify = require('es6ify'),
    watchify = require('watchify'),
    gulp = require('gulp'),
    chalk = require('chalk');

// Creating bundle
module.exports = function(callback) {
  var opts = {
    debug: true,
    entries: [__dirname + '/../public/js/main.jsx'],
    standalone: 'app',
    cache: {},
    packageCache: {},
    fullPaths: true
  };

  var bundler = browserify(opts)
    // .add(es6ify.runtime)
    .transform(reactify)
    .transform(es6ify.configure(/.jsx/));

  var watcher = watchify(bundler);

  function build(firstTime) {

    if (!firstTime)
      console.log(chalk.cyan('Updating') + ' bundle...');

    watcher.bundle()
      .pipe(source('app.bundle.js'))
      .pipe(gulp.dest(__dirname + '/../public/build'))
      .on('error', function(err) {
        console.log(err);
      })
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
