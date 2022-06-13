const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './client/index.js'
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.css/i,
        use: [
            'style-loader',
            'css-loader'
          ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname)
    },
    proxy: {
      '/bookshelf': 'http://localhost:3000'
    },
    compress: true,
    port: 8080,
    historyApiFallback: true
  }
}