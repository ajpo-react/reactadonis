const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var pkgBower = require('./package.json');

module.exports = {
  target: "web",
  devtool: "source-map",
  node: {
    fs: "empty"
  },
  entry: {
      'app': path.join(__dirname, 'react-app', 'index.js')
  },
  resolve: {
    modules: [__dirname, 'node_modules', 'bower_components'],
    extensions: ['*','.js','.jsx', '.es6.js']
  },
  output: {
    path: path.join(__dirname, 'public', 'src'),
    filename: '[name].js'
  },
  resolveLoader: {
     moduleExtensions: ["-loader"]
  },
  module: {
    rules: [
      {
          test: /jquery\.flot\.resize\.js$/,
          loader: 'imports?this=>window'
      },
      {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
          test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
          loader: 'url?prefix=font/&limit=10000'
      },
      {
          test: /\.(png|jpg|gif)$/,
          loader: 'url?limit=10000'
      },
      {
          test: /\.scss$/,
          loader: 'style!css!sass?outputStyle=expanded'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CopyWebpackPlugin([{
        from: 'img',
        to: 'img',
        context: path.join(__dirname, 'react-app')
    }, {
        from: 'server',
        to: 'server',
        context: path.join(__dirname, 'react-app')
    }, {
        from: 'fonts',
        to: 'fonts',
        context: path.join(__dirname, 'react-app')
    }]),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/)
  ]
};