var gulp = require('gulp');

gulp.task('buildAndExit', ['build'], function() {
  process.exit(0);
});
