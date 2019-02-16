const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),

    /**
     * publicPath: property specifies what directory the bundle should go in,
    and also tells webpack-dev-server where to serve files from.
    The publicPath property is a special property that helps us with our dev-server. It specifies the public URL of the the directory — at least as far as webpack-dev-server will know or care
     */

    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client'),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'UI'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|mp3)$/i,
        include: path.join(__dirname, 'UI'),
        loaders: ['file-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  devServer: {
    contentBase: path.join(__dirname, 'client/public/'),
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://127.0.0.1:2000',
      secure: false,
      changeOrigin: true
    },
    publicPath: 'http://127.0.0.1:3000/dist/',
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/public/index.html'
    })
  ]
};

module.exports = config;
