var autoprefixer = require('autoprefixer');
var scss_syntax = require('postcss-scss');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  // devtool: 'eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './_src/assets/scripts/entry.js',
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/public/portfolio'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.json?$/,
        loader: 'json',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?sourceMap',
          'sass?sourceMap', 'postcss'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
  postcss() {
    return {
      plugins: [autoprefixer],
      syntax: scss_syntax,
    };
  },
};