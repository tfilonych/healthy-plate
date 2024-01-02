const paths = require('config/paths')
import webpackNodeExternals from 'webpack-node-externals';

export default {
    entry: './server.js',
    // target: 'node',
    externals: [webpackNodeExternals()],
    output: {
        path: [paths.server + 'server-build'],
        filename: 'server.js'
    },
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },

            // Styles: Inject CSS into the head with source maps






        ],
    },
};