const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const workingDir = path.resolve(__dirname);

const webpack = require('webpack');
console.log('workingDir', workingDir);

const sassModulesPaths = ['src'];
// const sourceMap = true;
const sourceMap = false;
const cssLoaderOptions = {
    //localIdentName: '[hash:base64]-[name]-[local]',
    // localIdentName: '[name]-[hash:base64:5]',
    // modules: true,
    sourceMap,
    // importLoaders: 2,
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(workingDir, '../dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                // exclude: /bootstrap\.min\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: cssLoaderOptions,
                    },
                ],
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: Object.assign({}, cssLoaderOptions, {
                            importLoaders: 2,
                        }),
                    },
                    /*
                     {
                     loader: 'postcss-loader',
                     options: {
                     sourceMap,
                     },
                     },
                     //*/
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: sassModulesPaths,
                            sourceMap,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        //*
        new HtmlWebpackPlugin({
            template: 'src/index.template.html',
            inject: false,
        }),
        //*/
        //*
        new webpack.DefinePlugin({
            'process.env': {
                'VER': JSON.stringify(require('../package.json').version),
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new UglifyJSPlugin(),
    ],
};