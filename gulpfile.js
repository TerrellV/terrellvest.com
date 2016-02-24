const fs = require('fs');
const gulp = require('gulp');
const jade = require('gulp-jade');
const marked = require('marked');
const markdown = require('gulp-markdown');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
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

// GULP TASKS BELOW

/*
 * Render and Build Website
*/
gulp.task('render', function() {
  // Promises excecute at the same time not in any order
  buildArrays(); // build arrays must come first or arrays won't be formatted correctly
  return Promise.all([buildPort_P(), buildBlog_P(), buildAbout_P()]);
});

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
 * JAVASCRIPTS
*/
gulp.task('clientJs', function() {
  gulp.src('./_src/assets/scripts/**/*.js', {
      base: '_src'
    })
    .pipe(gulp.dest('_dist'));
    buildPort_P().then(browserSync.reload);
});

/*
 * JADE TEMPLATES
*/
gulp.task('jade', function() {
  gulp.src([
      '_src/**/*.jade',
      '!_src/{assets,assets/**}',
      '!_src/{blog,blog/**}',
      '!_src/{portfolio,portfolio/**}',
      '!_src/index.jade'
    ])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('_dist'));
});

/*
 * SCSS
*/
gulp.task('sass', function() {
  gulp.src('_src/assets/styles/main.scss', {
      base: '_src'
    })
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 version', '> 5% in US']}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('_dist'))
    .pipe(browserSync.stream());
});


/*
 * WATCH TASKS
*/
gulp.task('watch', function() {
  // sass updates
  gulp.watch('./_src/assets/styles/**/*.scss', ['sass']);
  // javascript updates
  gulp.watch('./_src/assets/scripts/**/*.js', ['clientJs']);
  // jade updates
  gulp.watch([
    './_src/assets/markup/nav.jade',
    './_src/contact/*.jade'],
    ['jade']);

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
    './_src/assets/markup/post-template.jade',
    './_src/assets/markup/projects-in-category.jade',
  ], function() {
    buildBlog_P().then(function() {
      browserSync.reload();
    });
  });

  // watch portfolio stuff
  gulp.watch([
    './_src/portfolio/projects-md/**/*.md',
    './_src/assets/markup/portfolio-template.jade',
    './_src/assets/markup/post-action-buttons.jade',
    './_src/assets/markup/projects-in-category.jade'
  ],function(){
    buildPort_P().then(browserSync.reload)
  })
});


/* Browser Sync Task*/
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './_dist'
    },
    port: 3000,
    open: false,
    notify: false
  })
});


// run development build
gulp.task('default', function(){
  runSequence( 'render', ['copy-images','clientJs','jade','sass'], 'browser-sync', 'watch' )
});
