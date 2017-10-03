var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('minify:css', function () {
    return gulp.src(['css/*.css', '!css/*.min.css'])
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cleanCSS({}))
        .pipe(gulp.dest('css'));
});

gulp.task('minify:js', function () {
    return gulp.src(['js/*.js', '!' + 'js/js*.min.js'])
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(uglify()).pipe(gulp.dest('js'));
});

gulp.task('minify:images', function () {
    return gulp.src('i/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ], {
            verbose: true
        }))
        .pipe(gulp.dest('i'));
});

gulp.task('default', ['minify:css', 'minify:js', 'minify:images']);