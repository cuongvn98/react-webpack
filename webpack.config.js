/*
 * Copyright (c) 2019.
 * Project: email-verifier-website.
 * Author: hirosume.
 */

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        entry: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].chunk.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        port: 3000,
        hot: true,
        proxy: {
            '/user': 'http://localhost:8080',
        },
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(css|scss|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
    ],
};
