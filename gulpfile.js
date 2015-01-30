var gulp = require('gulp'),
  jscs = require('gulp-jscs'),
  jshint = require('gulp-jshint'),
  bump = require('gulp-bump'),
  tagVersion = require('gulp-tag-version'),
  git = require('gulp-git'),
  cucumber = require('gulp-cucumber');

const SOURCE_FOLDERS = ['./src/**/*.js', './tests/features/**/*.js', 'gulpfile.js'];

//
// Check code style and lint
//
gulp.task('jscs', function() {
  return gulp.src(SOURCE_FOLDERS)
    .pipe(jscs());
});

gulp.task('jshint', function() {
  return gulp.src(SOURCE_FOLDERS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

//
// Tests
//
gulp.task('cucumber', function() {
  return gulp.src('./tests/features/*.feature')
    .pipe(cucumber({
      steps: './tests/features/step_definitions/*.js',
      support: './tests/features/support/*.js',
      format: 'summary'
    }));
});

//
// Default
//
gulp.task('default', ['jscs', 'jshint', 'cucumber']);

//
// Versioning
//
function bumpTagCommit(importance) {
  return gulp.src('./package.json')
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Bumps package version'))
    .pipe(tagVersion());
}

gulp.task('patch', ['default'], function() {
  return bumpTagCommit('patch');
});

gulp.task('minor', ['default'], function() {
  return bumpTagCommit('minor');
});

gulp.task('major', ['default'], function() {
  return bumpTagCommit('major');
});
