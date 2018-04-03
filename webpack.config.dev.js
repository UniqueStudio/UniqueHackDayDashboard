const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: require('./scripts/paths').appBuild,
    filename: '[name].[hash].js',
    publicPath: require('./scripts/paths').appPublic,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.template.html'),
    }),
  ],

  devServer: {
    hot: true,
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true, // set to true if you want JS source maps
  //     }),
  //     new OptimizeCSSAssetsPlugin({}),
  //   ],
  // },
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true,
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
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
            options: {
              noIeCompat: true,
            },
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
