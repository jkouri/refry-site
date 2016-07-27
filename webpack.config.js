'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const entryPoints = [
  path.join(__dirname, 'src', 'bootstrap'),
  path.join(__dirname, 'src', 'style.scss')
];

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(__dirname, 'src', 'index.html')
  }),
  new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  new webpack.optimize.CommonsChunkPlugin('vendor')
];

let devtool;

if (isProduction) {
  devtool = 'cheap-module-source-map';
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true },
      sourceMap: false
    })
  );
} else {
  devtool = false;
  entryPoints.unshift('webpack-dev-server/client?http://localhost:8080');
}

module.exports = {
  devtool,
  entry: {
    main: entryPoints,
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'react-codemirror',
      require.resolve('@teachers/tpt-connect')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap') },
      { test: /\.json$/, loader: 'json-loader' },
      { test: require.resolve('react'), loader: 'expose?React' },
      { test: require.resolve('react-dom'), loader: 'expose?ReactDOM' },
      { test: require.resolve('@teachers/tpt-connect'), loader: 'expose?Refry' }
      // uglify everything before so we can analyze size appropriately
      // { test: /\.jsx?$/, loader: 'uglify' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins,
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  }
};
