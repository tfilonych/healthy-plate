const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    // index: '',
    historyApiFallback: true,
    contentBase: paths.build,
    open: false,
    compress: true,
    hot: true,
    port: 3000,
    proxy: {
      '/api/': {
        target: 'http://localhost:5000',
        changeOrigin: true
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
