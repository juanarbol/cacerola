const TerserPlugin = require('terser-webpack-plugin')
const baseconfig = require('./webpack.config.js')
const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(baseconfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[chunkhash].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/
      })
    ]
  }
})
