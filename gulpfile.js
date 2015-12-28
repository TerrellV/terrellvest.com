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
const buildClientJs = require('./site-build-utills/buildClientScripts.js');
const buildBlog = require('./site-build-utills/renderBlog.js');
const buildPortfolio = require('./site-build-utills/renderPortfolio.js');

/* custom render functions */
function buildArrays(){
  posts.build(posts.startData);
  projects.build(projects.startData);
}
function callBuildPorfolio(res,rej){
  // Compile the portfolio posts into their own folders giving each their own index file
  const bP = new Promise(buildPortfolio.bind(null,'business', projects.business(), projects));
  const wP = new Promise(buildPortfolio.bind(null,'web', projects.web(), projects));

  Promise.all([bP,wP]).then(function(){
    console.log('*** Done with all portfolio building');
    res();
  });
}
function callbuildBlog(res,rej){
  new Promise(buildBlog.bind(null,posts)).then(function(){
    console.log('*** Done Building the Blog');
    res();
  });
}
function callBuildClientJs(res,rej){
  const config = {
    destPath: `_dist/assets/scripts`,
    fileName: `app.js`,
    templatePath: `_src/assets/markup/projects-in-category.jade`,
    projectObj: projects
  }
  const configArr = Object.keys(config).map(k => config[k]);

  new Promise(buildClientJs.bind(null,...configArr)).then(function(){
    console.log('*** Done Building the CientJsFile');
    res();
  });
}

gulp.task('render',function(){
  // create a promise for the portfolio build
  return new Promise(allRenderTasks);

  function allRenderTasks(res,rej){
    // Blog and Portfolio promises excecute at the same time
    // Task 1.
    buildArrays(); // build arrays must come first or arrays won't be formatted correctly
    // Task 2.
    const portPromise = new Promise(callBuildPorfolio);
    // Task 3.
    const blogPromise = new Promise(callbuildBlog);

    const clienJsPromise = new Promise(callBuildClientJs);

    Promise.all([portPromise,blogPromise,clienJsPromise]).then(res);
  }

});

/* normal gulp stuff below */

/* Browser Sync Task*/
gulp.task('browser-sync',['watch'], function(){
  browserSync.init({
    server: {
      baseDir: './_dist'
    },
    open: false,
    notify: false
  })

});
/*Gulp Task for the initial render sequence*/
gulp.task('sass', ['jade'], function(){
  gulp.src('_src/assets/styles/main.scss', {base: '_src'})
    .pipe(sass())
    .pipe(gulp.dest('_dist'))
    .pipe(browserSync.stream());
});
/*Gulp Task for updating without dependencies*/
gulp.task('sass-update', function(){
  gulp.src('_src/assets/styles/main.scss', {base: '_src'})
    .pipe(sass())
    .pipe(gulp.dest('_dist'))
    .pipe(browserSync.stream());
});
gulp.task('jade',['clientJs'], function(){
  gulp.src([
    '_src/**/*.jade',
    '!_src/{assets,assets/**}',
    '!_src/{blog,blog/**}'
  ])
    .pipe(jade())
    .pipe(gulp.dest('_dist'));
});
gulp.task('clientJs',['render'], function(){
  gulp.src('./_src/assets/scripts/helper.js', {base: '_src'})
    .pipe(gulp.dest('_dist'));
});
gulp.task('clientJs-update', function(){
  gulp.src('./_src/assets/scripts/helper.js', {base: '_src'})
    .pipe(gulp.dest('_dist'));
    browserSync.reload();
});

gulp.task('watch',['sass'], function(){
  gulp.watch('./_src/assets/styles/**/*.scss',['sass-update']);
  gulp.watch('./_src/assets/scripts/helper.js',['clientJs-update']);
  gulp.watch([
    './_src/blog/md-posts/*.md',
    './_src/blog/*.jade'
  ], function(){
    new Promise(callbuildBlog).then(function(){
      browserSync.reload();
    })
  })
  gulp.watch([
    './_src/portfolio/projects-md/**/*.md',
    './_src/portfolio/*.jade'
  ], function(){
    new Promise(callBuildPorfolio).then(function(){
      new Promise(callBuildClientJs).then(function(){
        browserSync.reload();
      })
    })
  })
});

gulp.task('default', ['render','clientJs','jade','sass','watch','browser-sync']);
