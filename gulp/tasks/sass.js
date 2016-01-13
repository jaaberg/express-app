var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var NopStream = require('../util/no-op-stream');
var handleErrors = require('../util/handle-errors');

var production = process.env.NODE_ENV === 'production';

gulp.task('sass', function() {
  gulp.src('./client/scss/*.scss')
    .pipe(sass({precision:10}))
    .pipe(production ? cssmin() : (new NopStream()))
    .pipe(gulp.dest('./client/public/stylesheets'))
    .on('error', handleErrors)
});
