const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    devServer:{
        watchFiles: ["src/**/*"],
    },
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                use: [ 'url-loader' ]
            }
        ],
    },
    resolve:{
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            cesium: path.resolve(__dirname, cesiumSource),
            rxjs: path.resolve(__dirname, 'node_modules/rxjs/dist')
        },
        mainFiles: ['index', 'Cesium']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "AeroAssets", to: "AeroAssets"},
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
            ],
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ],
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    devtool: "source-map"
};