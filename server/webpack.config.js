'use strict'

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const externals = _externals()

module.exports = {
  target: 'node',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'server',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  },
  // externals: externals,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'eslint-loader'
          }
        ],
        enforce: 'pre'
      },
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                node: true
              }
            }]],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ['remove-hashbag-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../web/dist/',
          to: 'public'
        }
      ]
    })
  ],
  resolveLoader: {
    alias: {
      'remove-hashbag-loader': path.join(__dirname, './loader/remove-hashbag-loader')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}

/*
function _externals () {
  const manifest = require('./package.json')
  const dependencies = manifest.dependencies
  const externals = {}
  for (const p in dependencies) {
    externals[p] = 'commonjs ' + p
  }
  return externals
}
*/
