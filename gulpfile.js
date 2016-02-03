const fs = require('fs');
const gulp = require('gulp');
const jade = require('gulp-jade');
const marked = require('marked');
const markdown = require('gulp-markdown');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
// custom render functions
const posts = require('./site-build-utills/generatePostBank.js');
const projects = require('./site-build-utills/generateProjectBank.js');
const buildAbout = require('./site-build-utills/renderAbout.js');
const buildBlog = require('./site-build-utills/renderBlog.js');
const buildPortfolioIndex = require('./site-build-utills/renderPortfolioIndex.js');
const buildPortfolio = require('./site-build-utills/renderPortfolio.js');

/* custom render functions */
function buildArrays() {
  posts.build(posts.startData);
  projects.build(projects.startData);
}

function buildAbout_P() {
  return new Promise(buildAbout)
}

function buildPort_P() {
  // compile portfolio index page
  const iP = new Promise(buildPortfolioIndex);
  // Compile the portfolio posts into their own folders giving each their own index file
  const bP = new Promise(buildPortfolio.bind(null, 'business', projects.business(), projects));
  const wP = new Promise(buildPortfolio.bind(null, 'web', projects.web(), projects));
  return Promise.all([iP, bP, wP]);
}

function buildBlog_P() {
  return new Promise(buildBlog.bind(null, posts));
}

gulp.task('render', function() {
  // Promises excecute at the same time not in any order
  buildArrays(); // build arrays must come first or arrays won't be formatted correctly
  return Promise.all([buildPort_P(), buildBlog_P(), buildAbout_P()]);
});

/* normal gulp stuff below */

/* Browser Sync Task*/
gulp.task('browser-sync', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: './_dist'
    },
    port: 8000,
    open: false,
    notify: false
  })

});
/*Gulp Task for the initial render sequence*/
gulp.task('sass', ['jade'], function() {
  gulp.src('_src/assets/styles/main.scss', {
      base: '_src'
    })
    .pipe(sass())
    .pipe(gulp.dest('_dist'))
    .pipe(browserSync.stream());
});
/*Gulp Task for updating without dependencies*/
gulp.task('sass-update', function() {
  gulp.src('_src/assets/styles/main.scss', {
      base: '_src'
    })
    .pipe(sass())
    .pipe(gulp.dest('_dist'))
    .pipe(browserSync.stream());
});
gulp.task('jade', ['clientJs'], function() {
  gulp.src([
      '_src/**/*.jade',
      '!_src/{assets,assets/**}',
      '!_src/{blog,blog/**}',
      '!_src/{portfolio,portfolio/**}',
      '!_src/index.jade'
    ])
    .pipe(jade())
    .pipe(gulp.dest('_dist'));
});
gulp.task('jade-update', function() {
  gulp.src([
      '_src/**/*.jade',
      '!_src/{assets,assets/**}',
      '!_src/{blog,blog/**}',
      '!_src/index.jade'
    ])
    .pipe(jade())
    .pipe(gulp.dest('_dist'));
});
gulp.task('clientJs', ['render'], function() {
  gulp.src('./_src/assets/scripts/client.js', {
      base: '_src'
    })
    .pipe(gulp.dest('_dist'));
});
gulp.task('clientJs-update', function() {
  gulp.src('./_src/assets/scripts/client.js', {
      base: '_src'
    })
    .pipe(gulp.dest('_dist'));
  buildPort_P().then(browserSync.reload);
});
gulp.task('watch', ['sass'], function() {
  gulp.watch('./_src/assets/styles/**/*.scss', ['sass-update']);
  gulp.watch('./_src/assets/scripts/client.js', ['clientJs-update']);
  gulp.watch('./_src/assets/markup/nav.jade', ['jade-update']);
  // watch about page
  gulp.watch([
    './_src/_about/*.md',
    './_src/*.jade'
  ], function() {
    buildAbout_P().then(browserSync.reload);
  });
  // watch blog stuff
  gulp.watch([
    './_src/blog/md-posts/*.md',
    './_src/blog/*.jade',
    './_src/assets/markup/post-template.jade'
  ], function() {
    buildBlog_P().then(function() {
      browserSync.reload();
    });
  });
  // watch portfolio stuff
  gulp.watch([
    './_src/portfolio/projects-md/web/*.md',
    './_src/portfolio/projects-md/business/*.md'
  ],function(){
    buildPort_P().then(browserSync.reload)
  })
});

gulp.task('default', ['render', 'clientJs', 'jade', 'sass', 'watch', 'browser-sync']);
