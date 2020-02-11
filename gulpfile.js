var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

sass.compiler = require("node-sass");

var sources = {
    css: './src/css/**/*.scss',
    html: [
        './src/html/**/*.{hbs,handlebars}',
        '!./src/html/partials/**/*.{hbs,handlebars}'
    ],
    watchers: {
        css: './src/css/**/*.scss',
        html: './src/html/**/*.{hbs,handlebars}',
        scripts: './src/scripts/**/*.js',
    },
    scripts: './src/scripts/**/*.js'
}

gulp.task('css', function() {
    return gulp.src(sources.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
}); 

gulp.task('html', function() {
    var options = {
        batch: ['./src/html/partials']
    };

    return gulp.src(sources.html)
        .pipe(handlebars({}, options))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest('./dist/html'));
});

gulp.task('scripts', function() {
    return gulp.src(sources.scripts)
        .pipe(concat('app.js'))
        .pipe(uglify())  /*https://coder-coder.com/gulp-4-walk-through/ */
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('default', gulp.series('html', 'css', 'scripts'));
gulp.task('watch', function() {
    gulp.watch(sources.watchers.css, gulp.series('css'));
    gulp.watch(sources.watchers.html, gulp.series('html'));
    gulp.watch(sources.watchers.scripts, gulp.series('scripts'));
});