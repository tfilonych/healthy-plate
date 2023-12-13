const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const paths = require('./paths')
const { HttpsProxyAgent } = require('https-proxy-agent');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    // index: '',
    historyApiFallback: true,
    //contentBase: paths.build,
    open: false,
    compress: true,
    hot: true,
    port: 3000,
    // proxy: {
    //   '/api': {
    //     agent: new HttpsProxyAgent('http://proxy.company.co.uk:3128'),
    //     target: 'https://env-01.dev.company.co.uk/v4/',
    //     pathRewrite: { '^/api': '' },
    //     changeOrigin: true,
    //   },
    proxy: {
      '/api': {
        //target: 'http://localhost:5000',
        //changeOrigin: true,
        // agent: new HttpsProxyAgent('http://proxy.company.co.uk:3128'),
        target: 'http://localhost:5000',
        secure: false,
        //pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
      '/images/': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/recipes/images/': {
        target: 'http://localhost:5000',
        pathRewrite: { '/recipes/images/': '/images/' },
        changeOrigin: true
      },
    },
    // proxy: [
    //   {
    //     context: ['**/images/', '/api/'],
    //     target: 'http://localhost:5000',
    //   },
    // ],
    // proxy: {
    //   '/': 'http://localhost:5000',
    //   '/images/': 'http://localhost:5000',
    // },
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
    ]
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
