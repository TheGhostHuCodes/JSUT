const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task("lint", function() {
    // return the stream so that the process is kept alive until done.
    return gulp.src([ "client/**/*.js", "!client/lib/**" ])
      .pipe(eslint())
      .pipe(eslint.format());
});
