var browserify = require('browserify');
var streamify = require('gulp-streamify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var browserSync = require('browser-sync');

var NopStream = require('../util/no-op-stream');
var handleErrors = require('../util/handle-errors');
var bundleLogger = require('../util/bundle-logger');

var production = process.env.NODE_ENV === 'production';

gulp.task('browserify', function(callback) {
  createBundles([
    {
      input: ['./client/javascript/index.js'],
      output: 'index.js',
      extensions: ['.handlebars'],
      destination: './client/public/javascript/'
    }
  ]);

  function createBundles(bundleConfigs) {
    var bundleQueue = bundleConfigs.length;

    bundleConfigs.forEach(function(bundleConfig) {
      var bundler = browserify({
        cache: {}, packageCache: {}, fullPaths: true,
        entries: bundleConfig.input,
        extensions: bundleConfig.extensions
      });

      if (global.isWatching) {
        bundler = watchify(bundler);
        // Rebundle on update
        bundler.on('update', function() {
          createSingleBundle(bundleConfig, bundler);
        });
      }
      createSingleBundle(bundleConfig, bundler);
    });

    function reportFinished(bundleConfig) {
      bundleLogger.end(bundleConfig.output);
      browserSync.reload();
      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          callback();
        }
      }
    }

    function createSingleBundle(bundleConfig, bundler) {
      bundleLogger.start(bundleConfig.output);
      bundler.bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.output))
        .pipe(production ? streamify(uglify()) : (new NopStream()))
        .pipe(gulp.dest(bundleConfig.destination))
        .on('end', function() {
          reportFinished(bundleConfig);
        });
    }
  }
});
