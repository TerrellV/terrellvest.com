import gulp from 'gulp';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import buildSite from './site-build-utils';
import devServer from './devServer';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import jade from 'gulp-jade';

/*
 * COPY IMAGES FROM SRC TO DIST
*/
gulp.task('copy-images', () => {
  gulp.src('_src/assets/images/**/*', {
    base: '_src',
  })
  .pipe(gulp.dest('_dist'));
});

/*
 * PRESITE BUILD
*/
gulp.task('render', () =>
  buildSite()
);

/* Dev Server */
gulp.task('devServer', () =>
  devServer()
);

/*
 * JADE TEMPLATES
*/
gulp.task('jade', () => {
  gulp.src('_src/contact/index.jade', {
    base: '_src',
  })
  .pipe(jade({ pretty: true }))
  .pipe(gulp.dest('_dist'));
});

/*
 * SCSS
*/
gulp.task('sass', () => {
  gulp.src('_src/assets/styles/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 version', '> 5% in US'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_dist/assets/styles'));
});


/*
 * WATCH TASKS
*/
gulp.task('watch', () => {
  gulp.watch('./_src/assets/styles/**/*.scss', ['sass']);

  gulp.watch([
    './_src/contact/**/*.jade',
  ], ['jade']);

  gulp.watch([
    './_src/assets/**/*.jade',
    './_src/**/*.md',
    './_src/blog/**/*.jade',
    './_src/portfolio/**/*.jade',
  ], ['render']);

  gulp.watch([
    './site-build-utils/*.js',
  ], ['render']);

  gulp.watch([
    './devServer.js',
  ], ['devServer']);
});

// run development build
gulp.task('default', () => {
  runSequence(['render', 'sass', 'jade'], 'devServer', 'watch');
});
