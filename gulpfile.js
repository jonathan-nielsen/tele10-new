var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");

sass.compiler = require("node-sass");

var sources = {
    css: './src/css/**/*.scss',
    html: [
        './src/html/**/*.{hbs,handlebars}',
        '!./src/html/partials/**/*.{hbs,handlebars}'
    ],
    watchers: {
        css: './src/css/**/*.scss',
        html: './src/html/**/*.{hbs,handlebars}'
    }
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

gulp.task('default', gulp.series('html', 'css'));
gulp.task('watch', function() {
    gulp.watch(sources.watchers.css, gulp.series('css'));
    gulp.watch(sources.watchers.html, gulp.series('html'));
});