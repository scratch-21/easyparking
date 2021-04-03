const path = require('path');

const rules = [{
  test: /\.(js|jsx|ts)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['@babel/react', '@babel/env']
    }
  },
];



module.exports = {
  mode: 'development',
  entry : path.resolve(__dirname, './client/index.js'),
  output:{
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules
  },

  devServer: {
    publicPath: '/build',
    proxy: {
      '/api': 'http://localhost:3000/'
    },
  }





}