const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./scripts/paths');

module.exports = {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: paths.appBuild,
    filename: '[name].[hash].js',
    publicPath: paths.appPublic,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.template.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          // all my code is written in ts, js files need no hot-reload
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel'],
              cacheDirectory: true,
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.(less|css)$/,
        include: /node_modules\/antd/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: JSON.parse(fs.readFileSync('.lessrc')),
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules\/antd/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              module: 1,
            },
          },
          {
            loader: 'less-loader',
            options: JSON.parse(fs.readFileSync('.lessrc')),
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
  },
};
