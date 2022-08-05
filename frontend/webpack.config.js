const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv')
const CopyPlugin = require("copy-webpack-plugin");

dotenv.config();

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'}),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets", to: "./assets" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options: {
            name: 'images/[hash]-[name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
    ]
  },
}