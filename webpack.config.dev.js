const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
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
                        options: JSON.parse(fs.readFileSync('.lessrc')),
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
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css', '.jpg', '.png'],
    },
};
