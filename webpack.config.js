const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public/dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['public/dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    /*new webpack.ProvidePlugin({
    $: "jquery/dist/jquery.min.js",
    jQuery: "jquery/dist/jquery.min.js",
    "window.jQuery": "jquery/dist/jquery.min.js"
  })*/
  ],
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ]
   }
};
