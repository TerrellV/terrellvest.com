const gulp = require('gulp');
const jade = require('gulp-jade');
const markdown = require('gulp-markdown');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

/* custom render functions */

// not working task
gulp.task('build', function(){
  gulp.src('./_src/_about/about-text.md', {base: '_src'})
    .pipe(markdown())
    .pipe(gulp.dest('_src'));
});

/* normal gulp stuff below */

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './_dist'
    },
    open: false,
    notify: false
  })

});

gulp.task('jade',function(){
  gulp.src(['./_src/*.jade','./_src/portfolio/*.jade'], {base: '_src'})
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('_dist'))
    .pipe(browserSync.stream());
});

// only compile the md for the about post
gulp.task('markdown', function(){
  gulp.src('./_src/_about/about-text.md', {base: '_src'})
    .pipe(markdown())
    .pipe(gulp.dest('_src'));
});

gulp.task('sass', function(){
  gulp.src('_src/assets/styles/main.scss', {base: '_src'})
    .pipe(sass())
    .pipe(gulp.dest('_dist'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function(){
  gulp.watch('./_src/assets/styles/**/*.scss',['sass']);
  gulp.watch('./_src/**/*.md', ['markdown']);
  gulp.watch('./_src/**/*.html', ['jade']);
  gulp.watch('./_src/**/*.jade', ['jade']);
});

gulp.task('default', ['markdown','jade','sass','watch','browser-sync']);
