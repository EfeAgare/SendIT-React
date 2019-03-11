const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'server/dist'),
    path: path.resolve(__dirname, 'dist'),

    /**
     * publicPath: property specifies what directory the bundle should go in,
    and also tells webpack-dev-server where to serve files from.
    The publicPath property is a special property that helps us with our dev-server. It specifies the public URL of the the directory — at least as far as webpack-dev-server will know or care
     */

    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'client'),
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'UI'),
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
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/public/index.html'
    })
  ]
};

module.exports = config;
