var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('compile-dev', function(){
    return gulp
        .src(['client/config.js', 'client/app.js', 'client/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/lib/'));
});

gulp.task('compile', ['compile-dev'], function(){
    return gulp
        .src(['public/lib/app.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public/lib/app.js'));
});