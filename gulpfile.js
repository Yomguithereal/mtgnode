/**
 * MTGNode Gulp Tasks
 * ===================
 *
 */
var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint');

var jsFiles = [
  './api/**/*.js',
  './scripts/*.js',
  './test/**/*.js'
];

// Linting
gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Testing
gulp.task('test', function() {
  return gulp.src('./test/endpoint.js')
    .pipe(mocha({reporter: 'spec'}));
});

// Default
gulp.task('default', ['lint']);
