var gulp = require('gulp');

var uglify = require('gulp-uglify');
var pegjs = require('gulp-peg');
var mocha = require('gulp-mocha');

gulp.task('build', function() {
  return gulp.src('./grammar/*.pegjs')
    .pipe(pegjs())
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('test', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }))
});
