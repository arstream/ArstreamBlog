// File: gulpfile.js
'use strict';

var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    stylus    = require('gulp-stylus'),
    nib       = require('nib'),
    inject    = require('gulp-inject'),
    wiredep   = require('wiredep').stream,
    gulpif    = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    useref    = require('gulp-useref'),
    uglify    = require('gulp-uglify'),
    uncss     = require('gulp-uncss'),
    using = require('gulp-using'),
    historyApiFallback = require('connect-history-api-fallback');
    
var exec = require('child_process').exec;    

gulp.task('server', function() {
  connect.server({
    root: 'output',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true
  });
});
 
gulp.task('compile', function (errorHandler) {
  exec('pelican ./content', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    errorHandler(err);
  }).on('error', errorHandler);
})

gulp.task('change', ['compile'], function() {
  gulp.src(['./content/**/*.md', './content/**/*.rst'])
    .pipe(connect.reload());
});

gulp.task('template', ['compile'], function() {
  gulp.src('pelicanconf.py')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./content/**/*.md', './content/**/*.rst'], ['change']);
  gulp.watch('pelicanconf.py', ['change']);
});

gulp.task('default', ['server', 'compile', 'change', 'watch']);


// Handle the error
function errorHandler (error) {
  gutil.log( gutil.colors.green( error.message ) );
  this.emit( 'end' );
}