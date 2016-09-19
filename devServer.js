import path from 'path';
import express from 'express';
import webpack from 'webpack';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from './webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import defaultRouter from './routes/default.js';

function devServer() {

  const app = express();
  const compiler = webpack(config);

  // middleware
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));


  // handle static files
  const rootStaticPath = path.join(process.cwd(),'_dist');

  app.use('/', express.static( rootStaticPath ));

  app.use('/portfolio/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '_dist/portfolio/index.html'))
  })

  const port = 8081;

  app.listen(port, 'localhost', err => {
    console.log('dev server generated');
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening at on port ${port}`);
  });
}

export default devServer;

/*
  Site Build Process
  1. Build the necessary folder structures and index files with markdown compiled to html

  2. Compile sass files

  ** first two tasks can run at same time

  3. start webpack devServer
*/
