/* eslint-disable no-path-concat */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const compress = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const client = {
  entry: {
    main: './client/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ],
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      test: /main\.bundle\.js$/
    })],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6'],
  },
  externals: {
    moment: 'moment',
    underscore: 'underscore',
    plotly: 'plotly',
    loadtest: 'loadtest'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new DynamicCdnWebpackPlugin(),
    new MinifyPlugin(),
    new compress(),
  ]
};


module.exports = [client];