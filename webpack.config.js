const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ComponentResolverPlugin = require('component-resolver-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  watch: true,
  devtool: 'source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      path.join(__dirname, 'src', 'bootstrap'),
      path.join(__dirname, 'src', 'style.scss')
    ],
    vendor: [
      'react',
      'react-dom',
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
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new webpack.ResolverPlugin([
      new ComponentResolverPlugin()
    ]),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  }
};
