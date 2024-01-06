const path = require("path");
const client = require('./webpack.dev.js')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const serverConfig = {
    target: "node",
    entry: "./render/index.js",
    output: {
        filename: "server.bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new NodePolyfillPlugin()
    ]
};

module.exports = [client, serverConfig];