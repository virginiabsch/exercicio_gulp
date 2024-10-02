const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./build/styles'))
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ingoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', { ingoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', { ingoreInitial: false }, gulp.series(comprimeImagens));
}


