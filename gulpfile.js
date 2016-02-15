var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var imagemin = require("gulp-imagemin");
var prefix = require('gulp-autoprefixer');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "build"
        }
    });
});


 gulp.task('templates', function() {
  gulp.src('template/**/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(reload({stream:true}));
});



 //Scripts

 //Uglify
gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});


// Styles

//
gulp.task('styles', function() {
  gulp.src('sass/**/*.sass')
  .pipe(plumber())
  .pipe(sass())
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(gulp.dest('build/css'))
  .pipe(reload({stream:true}));
});


/**
*
* Images
* - Compress them!
*
**/
gulp.task('images', function () {
  return gulp.src('images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'));
});



//Watch Task
gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['scripts'])
  gulp.watch('sass/**/*.sass', ['styles'])
  gulp.watch('template/**/*.jade', ['templates']);
});


gulp.task('default', ['scripts', 'styles', 'templates', 'watch', 'browser-sync']);
