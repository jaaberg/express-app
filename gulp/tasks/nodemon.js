var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
  nodemon({script: './bin/www', ext: 'html hbs scss js', ignore: ['node_modules/**'],
  legacyWatch: true});
});
