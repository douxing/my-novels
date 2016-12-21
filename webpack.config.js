const webpack = require('webpack');

module.exports = {
  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack-dev-server/client', // ?http://localhost:5001
    'babel-polyfill',
    `${__dirname}/client`
  ],
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // devServer: {
  //  hot: true,
  //  inline: true
  //},
  node: {
    dns: 'mock',
    net: 'mock'
  },
  plugins: [
  ]
};
