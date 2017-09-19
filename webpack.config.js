const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var fol=path.resolve(__dirname,"app/javascripts");
module.exports = {
  entry: './app/javascripts/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'myApp.js',
    publicPath:"/dist/"
  },
  module: {
    loaders: [
      {
        include: fol,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
}
