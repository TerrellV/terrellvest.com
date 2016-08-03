import gulp from 'gulp';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import buildSite from './site-build-utils';
import devServer from './devServer';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

/*
 * COPY IMAGES FROM SRC TO DIST
*/
gulp.task('copy-images', function(){
  gulp.src('_src/assets/images/**/*',{
      base: '_src'
    })
  .pipe(gulp.dest('_dist'));
});

/*
 * PRESITE BUILD
*/
gulp.task('render', function() {
  return buildSite();
});

/* Dev Server */
gulp.task('devServer', function() {
  devServer();
});

/*
 * JADE TEMPLATES
*/
gulp.task('jade', function() {

});

/*
 * SCSS
*/
gulp.task('sass', function() {
  gulp.src('_src/assets/styles/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 version', '> 5% in US']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_dist/assets/styles'))
});


/*
 * WATCH TASKS
*/
gulp.task('watch', function() {
  gulp.watch('./_src/assets/styles/**/*.scss', ['sass']);
  gulp.watch('./_src/**/*.jade', ['render']);
  gulp.watch(['./site-build-utils/*.js', ], ['render']);
  gulp.watch(['./devServer.js', ], ['devServer']);
});

// run development build
gulp.task('default', function(){
  runSequence( ['render', 'sass'], 'devServer', 'watch' )
});
