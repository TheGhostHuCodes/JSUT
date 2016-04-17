const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task("lint", function() {
    gulp.src([ "client/**/*.js", "!client/lib/**" ])
      .pipe(eslint())
      .pipe(eslint.format());
});
