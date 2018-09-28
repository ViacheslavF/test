var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');


module.exports = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
      {
        test: /\.less$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "css/bundle.css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/trains.json', to: 'trains.json', toType: 'file' }
    ])
  ]
}
