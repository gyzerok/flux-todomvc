'use strict';

var gulp = require('gulp');
//var react = require('gulp-react');
var react = require('react-tools');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');

var browserifyConfig = {
    entries: ['./src/app/index.js'],
    standalone: 'bundle'
};

var reactifyES6 = function (file) {
    return reactify(file, { es6: true });
};

gulp.task('clean', function (cb) {
    del(['./dist'], cb);
});

gulp.task('copy', function () {
    return gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('browserify', function () {
    return browserify(browserifyConfig)
        .transform(reactifyES6)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('default', ['copy', 'browserify']);