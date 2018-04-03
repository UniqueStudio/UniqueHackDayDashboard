const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./scripts/paths');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: paths.appBuild,
    filename: '[name].[hash].js',
    publicPath: paths.appPublic,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      publicPath: paths.appPublic,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.template.html'),
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.(less|css)$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
