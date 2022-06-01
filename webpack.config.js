const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './main/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'shelter'),
    assetModuleFilename: 'assets/[hash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
       test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
       type: 'asset/resource',
     },
     {
       test: /\.(woff(2)?|eot|ttf|otf)$/i,
       type: 'asset/resource',
     },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
   new HtmlWebpackPlugin({
     title: 'Hello world',
   }),
  ]
};