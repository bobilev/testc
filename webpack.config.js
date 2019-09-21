'use strict'
require("babel-register");
require("babel-polyfill");
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = env => {
    console.log('NODE_ENV: ', env.NODE_ENV);
    console.log(env.NODE_ENV !== 'production' ? 'style-loader' : "MiniCssExtractPlugin.loader");
    return {
        entry: {
            home: [
                'babel-polyfill',
                __dirname + '/source/js/index.jsx',
                __dirname + '/source/scss/main.scss',
            ],
        },
        output: {
            // publicPath: "/chat/",
            path: path.join(__dirname, 'dist'),
            filename: 'js/build.js?[hash]',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'eslint-loader'],
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.scss/,
                    exclude: /node_modules/,
                    use: [
                        'css-hot-loader',
                        env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        'sass-loader',
                    ],
                }
            ]
        },
        performance: { hints: false },//убераем лимит на размер главного файла
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            // proxy: [{
            //     context: ['/inbox', '/settings','/mqtt'],
            //     target: 'https://localhost:4040',
            //     secure: false
            // }],
            historyApiFallback: true,
            host: 'localhost',
            port: 10777,
            // historyApiFallback: {
            //   index: 'index.html'
            // }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles/style.css?[hash]",
            }),
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                template: 'source/template.html',
                filename: 'index.html',
            }),
        ]
    };

};
