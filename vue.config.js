const webpack = require('webpack')

module.exports = {
    configureWebpack: config => {
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      ]
      config.output.filename = '[name].js'
      config.output.chunkFilename = '[name].js'
    },
    css: {
      extract: {
        filename: '[name].css',
      },
    },
    chainWebpack:
      config => {
        config.optimization.delete('splitChunks')
      }
  }