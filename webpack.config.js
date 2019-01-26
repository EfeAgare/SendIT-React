const path = require('path');
const webpack = require('webpack');

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
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  devServer: {
    contentBase: path.join(__dirname, 'client/public/'),
    port: 2000,
    publicPath: 'http://localhost:2000/dist/',
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = config;
