var gulp = require('gulp'),
  jscs = require('gulp-jscs'),
  jshint = require('gulp-jshint'),
  bump = require('gulp-bump'),
  tagVersion = require('gulp-tag-version'),
  git = require('gulp-git'),
  cucumber = require('gulp-cucumber');

const SOURCE_FOLDERS = ['./src/**/*.js', './features/**/*.js', 'gulpfile.js'];

gulp.task('style', function() {
  return gulp.src(SOURCE_FOLDERS)
    .pipe(jscs());
});

gulp.task('lint', function() {
  return gulp.src(SOURCE_FOLDERS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('check', ['lint', 'style']);

gulp.task('cucumber', ['check'], function() {
  return gulp.src('./features/**/*.js')
    .pipe(cucumber({
      format: 'summary'
    }));
});

function bumpTagCommit(importance) {
  return gulp.src('./package.json')
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Bumps package version'))
    .pipe(tagVersion());
}

gulp.task('patch', ['check'], function() {
  return bumpTagCommit('patch');
});

gulp.task('minor', ['check'], function() {
  return bumpTagCommit('minor');
});

gulp.task('major', ['check'], function() {
  return bumpTagCommit('major');
});

gulp.task('default', ['check']);
