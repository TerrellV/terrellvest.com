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
    path: './_dist/portfolio',
    filename: 'bundle.js',
    publicPath: '/public/portfolio',
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
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'eslint',
    //     exclude: /node_modules/,
    //   },
    // ],
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
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:10]',
          'sass-loader?sourceMap',
          'postcss-loader',
          'sass-resources',
        ],
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
    };
  },
  sassResources: [
    './_src/assets/styles/partials/vars.scss',
    './_src/assets/styles/partials/grid.scss',
    './_src/assets/styles/partials/mixins.scss',
    './_src/assets/styles/partials/site-wide.scss',
    './_src/assets/styles/partials/typography.scss',
  ],
};
