const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function style(){
  return gulp.src('./src/stylesheet/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function js(){
  return gulp.src('./src/js/**.*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
}

function watch(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./src/stylesheet/**/*.scss', style);
  gulp.watch("**/*").on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
