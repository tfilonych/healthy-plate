import path from 'path';
import { fileURLToPath } from 'url';
import client from './webpack.dev.js';
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

export default [client, serverConfig];